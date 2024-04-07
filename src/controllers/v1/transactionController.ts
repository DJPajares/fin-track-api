import { NextFunction, Request, Response } from 'express';
import * as transactionService from '../../services/v1/transactionService';
import { PaginationProps } from '../../types/commonTypes';
import { Types } from 'mongoose';

const create = async (req: Request, res: Response, next: NextFunction) => {
  const data = await transactionService.create(req.body);

  res.status(200).json({
    success: true,
    data
  });
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  const query = req.query as unknown as PaginationProps;

  const result = await transactionService.getAll(query);

  res.status(200).json({
    success: true,
    ...result
  });
};

const get = async (req: Request, res: Response, next: NextFunction) => {
  const id = new Types.ObjectId(req.params.id);

  const data = await transactionService.get(id);

  res.status(200).json({
    success: true,
    data
  });
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const id = new Types.ObjectId(req.params.id);

  const data = await transactionService.update(id, req.body);

  res.status(200).json({
    success: true,
    data
  });
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  const id = new Types.ObjectId(req.params.id);

  const data = transactionService.remove(id);

  res.status(200).json({
    success: true,
    data
  });
};

export { create, getAll, get, update, remove };
