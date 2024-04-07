import { PaymentModel, PaymentProps } from '../../models/v1/paymentModel';
import { PaginationProps } from '../../types/commonTypes';
import createPagination from '../../utilities/createPagination';
import * as transactionService from './transactionService';
import setSettledAmount from '../../utilities/setSettledAmount';

const create = async (data: PaymentProps) => {
  const { transaction, amount } = data;

  const transactionServiceResult: any = await transactionService.get(
    transaction
  );
  const transactionAmount = transactionServiceResult[0].amount;

  const settled = setSettledAmount({
    settledAmount: amount,
    transactionAmount
  });

  const output = {
    ...data,
    ...settled
  };

  return await PaymentModel.create(output);
};

const getAll = async (query: PaginationProps) => {
  const totalDocuments = await PaymentModel.countDocuments();
  const paginationResult = createPagination(query, totalDocuments);
  const { skip, limit, pagination } = paginationResult;

  const data = await PaymentModel.find()
    .populate('transaction')
    .skip(skip)
    .limit(limit);

  return {
    data,
    pagination
  };
};

const get = async (_id: PaymentProps['_id']) => {
  return await PaymentModel.find({ _id }).populate('transaction');
};

const update = async (_id: PaymentProps['_id'], data: PaymentProps) => {
  const { transaction, amount } = data;

  const transactionServiceResult: any = await transactionService.get(
    transaction
  );
  const transactionAmount = transactionServiceResult[0].amount;

  const settled = setSettledAmount({
    settledAmount: amount,
    transactionAmount
  });

  const output = {
    ...data,
    ...settled
  };

  return await PaymentModel.findOneAndUpdate({ _id }, output, {
    new: true
  }).populate('transaction');
};

const remove = async (_id: PaymentProps['_id']) => {
  return await PaymentModel.findByIdAndDelete({ _id });
};

export { create, getAll, get, update, remove };
