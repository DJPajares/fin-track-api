import { TypeModel } from '../models/types';
import type { TypeProps } from '../interfaces/types';
import { Request } from 'express';

const createType = async (data: TypeProps) => {
  try {
    return TypeModel.create(data);
  } catch (error) {
    console.error(error);
    throw new Error('Could not create');
  }
};

const getType = async (req: Request) => {
  try {
    return TypeModel.find({});
  } catch (error) {
    console.error(error);
    throw new Error('Could not get');
  }
};

const updateType = async (data: TypeProps) => {
  try {
    const { _id, name } = data;

    return TypeModel.updateOne({ _id }, { name });
  } catch (error) {
    console.error(error);
    throw new Error('Could not update');
  }
};

const deleteType = async (data: TypeProps) => {
  try {
    const { _id } = data;

    return TypeModel.deleteOne({ _id });
  } catch (error) {
    console.error(error);
    throw new Error('Could not delete');
  }
};

export { createType, getType, updateType, deleteType };
