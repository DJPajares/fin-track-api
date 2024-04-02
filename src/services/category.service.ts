import { CategoryModel, CategoryProps } from '../models/category.model';

const create = async (data: CategoryProps) => {
  return await CategoryModel.create(data);
};

const getAll = async () => {
  return await CategoryModel.find();
};

const get = async (_id: CategoryProps['_id']) => {
  return await CategoryModel.findOne({ _id });
};

const update = async (_id: CategoryProps['_id'], data: CategoryProps) => {
  return await CategoryModel.updateOne({ _id }, data);
};

const remove = async (_id: CategoryProps['_id']) => {
  return await CategoryModel.deleteOne({ _id });
};

export { create, getAll, get, update, remove };
