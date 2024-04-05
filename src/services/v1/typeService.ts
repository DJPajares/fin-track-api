import { TypeModel } from '../../models/v1/typeModel';
import type { TypeProps } from '../../models/v1/typeModel';
import { PaginationProps } from '../../types/commonTypes';
import pagination from '../../utilities/pagination';

const create = async (data: TypeProps) => {
  return await TypeModel.create(data);
};

const getAll = async (query: PaginationProps) => {
  const totalCollection = await TypeModel.countDocuments();
  const result = pagination(query, totalCollection);

  const { skip, limit, metadata } = result;

  const data = await TypeModel.find().skip(skip).limit(limit);

  return {
    data,
    pagination: metadata
  };
};

const get = async (_id: TypeProps['_id']) => {
  return await TypeModel.findOne({ _id });
};

const update = async (_id: TypeProps['_id'], data: TypeProps) => {
  return await TypeModel.updateOne({ _id }, data);
  // return await TypeModel.findOneAndUpdate({ _id }, data);
};

const remove = async (_id: TypeProps['_id']) => {
  return await TypeModel.deleteOne({ _id });
  // return await TypeModel.findByIdAndDelete(id);
};

export { create, getAll, get, update, remove };
