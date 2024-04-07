import { PaymentModel, PaymentProps } from '../../models/v1/paymentModel';
import { PaginationProps } from '../../types/commonTypes';
import createPagination from '../../utilities/createPagination';

const create = async (data: PaymentProps) => {
  return await PaymentModel.create(data);
};

const getAll = async (query: PaginationProps) => {
  const totalDocuments = await PaymentModel.countDocuments();
  const paginationResult = createPagination(query, totalDocuments);
  const { skip, limit, pagination } = paginationResult;

  const data = await PaymentModel.find()
    .populate(['category', 'currency'])
    .skip(skip)
    .limit(limit);

  return {
    data,
    pagination
  };
};

const get = async (_id: PaymentProps['_id']) => {
  return await PaymentModel.find({ _id });
};

const update = async (_id: PaymentProps['_id'], data: PaymentProps) => {
  return await PaymentModel.updateOne({ _id }, data);
};

const remove = async (_id: PaymentProps['_id']) => {
  return await PaymentModel.deleteOne({ _id });
};

export { create, getAll, get, update, remove };
