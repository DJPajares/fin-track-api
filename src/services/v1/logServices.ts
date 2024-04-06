import { LogModel, LogProps } from '../../models/v1/logModel';
import { PaginationProps } from '../../types/commonTypes';
import createPagination from '../../utilities/createPagination';

const create = async (data: LogProps) => {
  return await LogModel.create(data);
};

const getAll = async (query: PaginationProps) => {
  const totalDocuments = await LogModel.countDocuments();
  const paginationResult = createPagination(query, totalDocuments);
  const { skip, limit, pagination } = paginationResult;

  const data = await LogModel.find()
    .populate(['category', 'currency'])
    .skip(skip)
    .limit(limit);

  return {
    data,
    pagination
  };
};

const get = async (_id: LogProps['_id']) => {
  return await LogModel.find({ _id });
};

const update = async (_id: LogProps['_id'], data: LogProps) => {
  return await LogModel.updateOne({ _id }, data);
};

const remove = async (_id: LogProps['_id']) => {
  return await LogModel.deleteOne({ _id });
};

export { create, getAll, get, update, remove };
