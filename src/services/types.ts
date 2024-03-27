import { TypeModel } from '../models/types';
import type { TypeProps } from '../interfaces/types';
import { Request } from 'express';

const createType = async (data: TypeProps) => {
  try {
    return TypeModel.create(data);
  } catch (error) {
    console.error(error);
    throw new Error('Could not create type');
  }
};

export { createType };
