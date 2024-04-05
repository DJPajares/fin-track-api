import { CategoryModel, CategoryProps } from '../../models/v1/category.model';

const create = async (data: CategoryProps) => {
  return await CategoryModel.create(data);
};

const getAll = async () => {
  return await CategoryModel.find().populate('type');
};

const get = async (_id: CategoryProps['_id']) => {
  return await CategoryModel.findOne({ _id }).populate('type');
};

const update = async (_id: CategoryProps['_id'], data: CategoryProps) => {
  return await CategoryModel.updateOne({ _id }, data);
};

const remove = async (_id: CategoryProps['_id']) => {
  return await CategoryModel.deleteOne({ _id });
};

export { create, getAll, get, update, remove };
