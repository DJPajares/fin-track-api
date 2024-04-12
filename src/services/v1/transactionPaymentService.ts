import { CategoryModel } from '../../models/v1/categoryModel';
import { CurrencyModel } from '../../models/v1/currencyModel';
import { PaymentModel } from '../../models/v1/paymentModel';
import { TransactionModel } from '../../models/v1/transactionModel';
import { TypeModel } from '../../models/v1/typeModel';

const fetchTransactionPayments = async (dateString: Date) => {
  const date = new Date(dateString);

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
      // Filter transactions where the category type is 'Expense'
      $match: {
        'type.name': 'Expense'
      }
    },
    {
      $project: {
        _id: 1,
        name: 1,
        categoryId: '$category._id',
        categoryName: '$category.name',
        typeId: '$type._id',
        typeName: '$type.name',
        amount: 1,
        currencyId: '$currency._id',
        currencyName: '$currency.name',
        description: 1,
        recurring: 1,
        startDate: 1,
        endDate: 1,
        excludedDates: 1
      }
    }
  ]);

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
    },
    {
      $project: {
        _id: 1,
        name: 1,
        categoryId: '$category._id',
        categoryName: '$category.name',
        typeId: '$type._id',
        typeName: '$type.name',
        amount: 1,
        currencyId: '$currency._id',
        currencyName: '$currency.name',
        description: 1,
        recurring: 1,
        startDate: 1,
        endDate: 1,
        excludedDates: 1
      }
    }
  ]);

  // output
  return expenseTransactionPayments;
};

export { fetchTransactionPayments };
