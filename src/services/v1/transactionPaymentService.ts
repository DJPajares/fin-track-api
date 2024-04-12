import { CategoryModel } from '../../models/v1/categoryModel';
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
        as: 'categoryType'
      }
    },
    {
      // Filter transactions where the category type is 'Expense'
      $match: {
        'categoryType.name': 'Expense'
      }
    },
    {
      $group: {
        _id: '$category._id', // group key
        name: { $first: '$category.name' },
        totalAmount: { $sum: '$amount' },
        totalPaidAmount: { $sum: { $sum: '$payment.amount' } },
        paymentCompletionRate: {
          $avg: {
            $divide: [
              { $sum: { $sum: '$payment.amount' } },
              { $sum: '$amount' }
            ]
          }
        },
        // Calculate the payment completion rate for each category
        transactions: {
          $push: {
            _id: '$_id',
            name: '$name',
            amount: '$amount',
            paidAmount: { $sum: '$payment.amount' }
          }
        }
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
        as: 'categoryType'
      }
    },
    {
      // Filter transactions where the category type is 'Expense'
      $match: {
        'categoryType.name': 'Income'
      }
    },
    {
      $group: {
        _id: '$category._id', // group key
        name: { $first: '$category.name' },
        totalAmount: { $sum: '$amount' },
        // Calculate the payment completion rate for each category
        transactions: {
          $push: {
            _id: '$_id',
            name: '$name',
            amount: '$amount'
          }
        }
      }
    },
    {
      $group: {
        _id: null,
        categories: { $push: '$$ROOT' },
        totalAmount: { $sum: '$totalAmount' }
      }
    },
    {
      $addFields: {
        totalBudget: '$totalAmount'
      }
    },
    {
      $project: { categories: 1, totalBudget: 1, _id: 0 } // Exclude _id field
    }
  ]);

  // output
  return expenseTransactionPayments;
};

export { fetchTransactionPayments };
