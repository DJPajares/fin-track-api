import { Request, Response, NextFunction } from 'express';
import * as typeService from '../services/type.service';
import { Types } from 'mongoose';

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await typeService.create(req.body));
  } catch (error) {
    next(error);
  }
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await typeService.getAll());
  } catch (error) {
    next(error);
  }
};

const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _id = new Types.ObjectId(req.params.id);

    res.json(await typeService.get(_id));
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _id = new Types.ObjectId(req.params.id);
    const data = req.body;

    res.json(await typeService.update(_id, data));
  } catch (error) {
    next(error);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _id = new Types.ObjectId(req.params.id);

    res.json(await typeService.remove(_id));
  } catch (error) {
    next(error);
  }
};

export { create, getAll, get, update, remove };
