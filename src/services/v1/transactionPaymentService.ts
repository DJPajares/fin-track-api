import { CategoryModel } from '../../models/v1/categoryModel';
import { CurrencyModel } from '../../models/v1/currencyModel';
import { PaymentModel } from '../../models/v1/paymentModel';
import { TransactionModel } from '../../models/v1/transactionModel';
import { TypeModel } from '../../models/v1/typeModel';

const fetchTransactionPayments = async (dateString: Date) => {
  const date = new Date(dateString);

  const incomeTransactions = await TransactionModel.aggregate([
    {
      // Find transactions within the specified date range and exclude transactions with the specified date
      $match: {
        startDate: { $lte: date },
        endDate: { $gte: date },
        excludedDates: { $nin: [date] }
      }
    },
    {
      // Perform a left outer join with the CategoryModel collection
      $lookup: {
        from: CategoryModel.collection.name,
        localField: 'category',
        foreignField: '_id',
        as: 'category'
      }
    },
    {
      // Unwind the array created by populate to get the category object
      $unwind: '$category'
    },
    {
      // Perform a left outer join with the TypeModel collection based on the 'type' field of the category
      $lookup: {
        from: TypeModel.collection.name,
        localField: 'category.type',
        foreignField: '_id',
        as: 'type'
      }
    },
    {
      // Unwind the array created by populate to get the category object
      $unwind: '$type'
    },
    {
      // Perform a left outer join with the TypeModel collection based on the 'type' field of the category
      $lookup: {
        from: CurrencyModel.collection.name,
        localField: 'currency',
        foreignField: '_id',
        as: 'currency'
      }
    },
    {
      // Unwind the array created by populate to get the category object
      $unwind: '$currency'
    },
    {
      // Filter transactions where the category type is 'Expense'
      $match: {
        'type.name': 'Income'
      }
    }
    // {
    //   $project: {
    //     _id: 1,
    //     name: 1,
    //     categoryId: '$category._id',
    //     categoryName: '$category.name',
    //     typeId: '$type._id',
    //     typeName: '$type.name',
    //     amount: 1,
    //     currencyId: '$currency._id',
    //     currencyName: '$currency.name',
    //     description: 1,
    //     recurring: 1,
    //     startDate: 1,
    //     endDate: 1,
    //     excludedDates: 1
    //   }
    // }
  ]);

  const expenseTransactionPayments = await TransactionModel.aggregate([
    {
      // Find transactions within the specified date range and exclude transactions with the specified date
      $match: {
        startDate: { $lte: date },
        endDate: { $gte: date },
        excludedDates: { $nin: [date] }
      }
    },
    {
      // Perform a left outer join with the PaymentModel collection
      $lookup: {
        from: PaymentModel.collection.name,
        localField: '_id',
        foreignField: 'transaction',
        as: 'payment',
        pipeline: [
          {
            $match: {
              date: { $gte: date }
            }
          }
        ]
      }
    },
    {
      // Perform a left outer join with the CategoryModel collection
      $lookup: {
        from: CategoryModel.collection.name,
        localField: 'category',
        foreignField: '_id',
        as: 'category'
      }
    },
    {
      // Unwind the array created by populate to get the category object
      $unwind: '$category'
    },
    {
      $lookup: {
        from: CurrencyModel.collection.name,
        localField: 'currency',
        foreignField: '_id',
        as: 'currency'
      }
    },
    {
      $unwind: '$currency'
    },
    {
      // Perform a left outer join with the TypeModel collection based on the 'type' field of the category
      $lookup: {
        from: TypeModel.collection.name,
        localField: 'category.type',
        foreignField: '_id',
        as: 'type'
      }
    },
    {
      $unwind: '$type'
    },
    {
      // Filter transactions where the category type is 'Expense'
      $match: {
        'type.name': 'Expense'
      }
    },
    {
      $addFields: {
        paidAmount: { $sum: '$payment.amount' }
      }
    }
    // {
    //   $project: {
    //     _id: 1,
    //     name: 1,
    //     categoryId: '$category._id',
    //     categoryName: '$category.name',
    //     typeId: '$type._id',
    //     typeName: '$type.name',
    //     amount: 1,
    //     paidAmount: { $sum: '$payment.amount' },
    //     currencyId: '$currency._id',
    //     currencyName: '$currency.name',
    //     description: 1,
    //     recurring: 1,
    //     startDate: 1,
    //     endDate: 1,
    //     excludedDates: 1
    //   }
    // }
  ]);

  const cleanUpData = () => {
    const budget = incomeTransactions.reduce(
      (accumulator, incomeTransaction) =>
        accumulator + parseFloat(incomeTransaction.amount),
      0
    );

    const totalAmount = expenseTransactionPayments.reduce(
      (acculumator, expenseTransactionPayment) =>
        acculumator + parseFloat(expenseTransactionPayment.amount),
      0
    );

    const totalPaidAmount = expenseTransactionPayments.reduce(
      (accumulator, expenseTransactionPayment) =>
        accumulator + parseFloat(expenseTransactionPayment.paidAmount),
      0
    );

    const main = {
      budget,
      totalAmount,
      totalPaidAmount,
      balance: budget - totalPaidAmount,
      extra: budget - totalAmount,
      paymentCompletionRate: totalPaidAmount / totalAmount
    };

    const categories = Object.values(
      expenseTransactionPayments.reduce(
        (accumulator, expenseTransactionPayment) => {
          const key = expenseTransactionPayment.category._id;

          if (!accumulator[key]) {
            accumulator[key] = {
              _id: expenseTransactionPayment.category._id,
              name: expenseTransactionPayment.category.name,
              totalAmount: 0,
              totalPaidAmount: 0,
              transactions: []
            };
          }

          const transaction = {
            _id: expenseTransactionPayment._id,
            name: expenseTransactionPayment.name,
            amount: parseFloat(expenseTransactionPayment.amount),
            paidAmount: parseFloat(expenseTransactionPayment.paidAmount)
          };

          accumulator[key].transactions.push(transaction);
          accumulator[key].totalAmount += transaction.amount;
          accumulator[key].totalPaidAmount += transaction.paidAmount;
          accumulator[key].paymentCompletionRate =
            accumulator[key].totalPaidAmount / accumulator[key].totalAmount;

          return accumulator;
        },
        {}
      )
    );

    const output = {
      main,
      categories
    };

    return output;
  };

  var data = cleanUpData();

  return data;
};

export { fetchTransactionPayments };
