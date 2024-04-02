import { Request } from 'express';
import { TypeModel } from '../models/type.model';
import type { TypeProps } from '../models/type.model';

const createType = async (data: TypeProps) => {
  try {
    return await TypeModel.create(data);
  } catch (error) {
    console.error(error);
    throw new Error('Could not create');
  }
};

const getType = async (req: Request) => {
  try {
    return await TypeModel.find({});
  } catch (error) {
    console.error(error);
    throw new Error('Could not get');
  }
};

const updateType = async (data: TypeProps) => {
  try {
    const { _id, name } = data;

    return await TypeModel.updateOne({ _id }, { name });
  } catch (error) {
    console.error(error);
    throw new Error('Could not update');
  }
};

const deleteType = async (data: TypeProps) => {
  try {
    const { _id } = data;

    return await TypeModel.deleteOne({ _id });
  } catch (error) {
    console.error(error);
    throw new Error('Could not delete');
  }
};

export { createType, getType, updateType, deleteType };
