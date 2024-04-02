import { Request, Response, NextFunction } from 'express';
import * as typeService from '../services/type.service';
import { Types } from 'mongoose';

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await typeService.create(req.body));
    // const data = await typeService.create(req.body);

    // res.status(200).send({
    //   success: true,
    //   data
    // });
  } catch (error) {
    console.error(`Error creating the type`, error);
    next(error);
  }
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await typeService.getAll());
  } catch (error) {
    console.error(`Error getting all types`, error);
    next(error);
  }
};

const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _id = new Types.ObjectId(req.params.id);

    res.json(await typeService.get(_id));
  } catch (error) {
    console.error(`Error getting the type`, error);
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _id = new Types.ObjectId(req.params.id);
    const data = req.body;

    res.json(await typeService.update(_id, data));
  } catch (error) {
    console.error(`Error updating the type`, error);
    next(error);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _id = new Types.ObjectId(req.params.id);

    res.json(await typeService.remove(_id));
  } catch (error) {
    console.error(`Error removing the type`, error);
    next(error);
  }
};

export { create, getAll, get, update, remove };
