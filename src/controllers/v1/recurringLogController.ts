import { NextFunction, Request, Response } from 'express';
import * as recurringService from '../../services/v1/recurringLogService';
import { PaginationProps } from '../../types/commonTypes';
import { Types } from 'mongoose';

const create = async (req: Request, res: Response, next: NextFunction) => {
  const data = await recurringService.create(req.body);

  res.status(200).json({
    success: true,
    data
  });
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  const query = req.query as unknown as PaginationProps;

  const result = await recurringService.getAll(query);

  res.status(200).json({
    success: true,
    ...result
  });
};

const get = async (req: Request, res: Response, next: NextFunction) => {
  const id = new Types.ObjectId(req.params.id);

  const data = await recurringService.get(id);

  res.status(200).json({
    success: true,
    data
  });
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const id = new Types.ObjectId(req.params.id);

  const data = await recurringService.update(id, req.body);

  res.status(200).json({
    success: true,
    data
  });
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  const id = new Types.ObjectId(req.params.id);

  const data = recurringService.remove(id);

  res.status(200).json({
    success: true,
    data
  });
};

export { create, getAll, get, update, remove };
