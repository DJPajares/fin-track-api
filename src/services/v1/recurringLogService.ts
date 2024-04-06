import {
  RecurringLogModel,
  RecurringLogProps
} from '../../models/v1/recurringLogModel';
import { PaginationProps } from '../../types/commonTypes';
import createPagination from '../../utilities/createPagination';

const create = async (data: RecurringLogProps) => {
  return await RecurringLogModel.create(data);
};

const getAll = async (query: PaginationProps) => {
  const totalDocuments = await RecurringLogModel.countDocuments();
  const paginationResult = createPagination(query, totalDocuments);

  const { skip, limit, pagination } = paginationResult;

  const data = await RecurringLogModel.find()
    .populate(['category', 'currency'])
    .skip(skip)
    .limit(limit);

  return {
    data,
    pagination
  };
};

const get = async (_id: RecurringLogProps['_id']) => {
  return await RecurringLogModel.find({ _id });
};

const update = async (
  _id: RecurringLogProps['_id'],
  data: RecurringLogProps
) => {
  return await RecurringLogModel.updateOne({ _id }, data);
};

const remove = async (_id: RecurringLogProps['_id']) => {
  return await RecurringLogModel.deleteOne({ _id });
};

export { create, getAll, get, update, remove };
