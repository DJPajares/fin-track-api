import { PaymentModel } from '../../models/v1/paymentModel';
import { TransactionModel } from '../../models/v1/transactionModel';

const fetchTransactionPayments = async (date: Date) => {
  console.log(date);
  const transactionsWithPayments = await TransactionModel.aggregate([
    {
      $match: {
        // startDate: { $gte: date }
        // endDate: { $lte: date }
        // excludedDates: { $nin: [date] }
        // amount: { $lte: 200000 }
      }
    },
    {
      $lookup: {
        from: PaymentModel.collection.name,
        localField: '_id',
        foreignField: PaymentModel.schema.path('transaction').path,
        as: PaymentModel.collection.name,
        pipeline: [
          {
            $match: {
              // date: { $gte: date }
              amount: { $gte: 100 }
            }
          }
        ]
      }
    }
  ]);

  // calculate total payments

  // output
  return transactionsWithPayments;
};

export { fetchTransactionPayments };
