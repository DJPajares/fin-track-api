import { NextFunction, Request, Response } from 'express';
import * as categoryService from '../services/category.service';
import { Types } from 'mongoose';

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await categoryService.create(req.body));
  } catch (error) {
    next(error);
  }
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await categoryService.getAll());
  } catch (error) {
    next(error);
  }
};

const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = new Types.ObjectId(req.params.id);

    res.json(await categoryService.get(id));
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = new Types.ObjectId(req.params.id);
    const data = req.body;

    res.json(await categoryService.update(id, data));
  } catch (error) {
    next(error);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = new Types.ObjectId(req.params.id);

    res.json(await categoryService.remove(id));
  } catch (error) {
    next(error);
  }
};

export { create, getAll, get, update, remove };
