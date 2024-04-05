import { TypeModel } from '../../models/v1/typeModel';
import type { TypeProps } from '../../models/v1/typeModel';

const create = async (values: TypeProps) => {
  return await TypeModel.create(values);
};

const getAll = async (skip: number, limit: number) => {
  return await TypeModel.find().skip(skip).limit(limit);
};

const get = async (_id: TypeProps['_id']) => {
  return await TypeModel.findOne({ _id });
};

const update = async (_id: TypeProps['_id'], values: TypeProps) => {
  return await TypeModel.updateOne({ _id }, values);
  // return await TypeModel.findOneAndUpdate({ _id }, values);
};

const remove = async (_id: TypeProps['_id']) => {
  return await TypeModel.deleteOne({ _id });
  // return await TypeModel.findByIdAndDelete(id);
};

export { create, getAll, get, update, remove };
