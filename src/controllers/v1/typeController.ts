import { Request, Response, NextFunction } from 'express';
import * as typeService from '../../services/v1/typeService';
import { Types } from 'mongoose';
import { PaginationRequestProps } from '../../types/commonTypes';

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await typeService.create(req.body);

    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (
  req: PaginationRequestProps,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.paginationQuery) {
      const { skip, limit } = req.paginationQuery;
      const data = await typeService.getAll(skip, limit);

      res.status(200).json({
        success: true,
        data,
        ...res.locals.pagination
      });
    } else {
      throw new Error('Pagination query is not available');
    }
  } catch (error) {
    next(error);
  }
};

const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _id = new Types.ObjectId(req.params.id);

    const data = await typeService.get(_id);

    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _id = new Types.ObjectId(req.params.id);

    const data = await typeService.update(_id, req.body);

    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _id = new Types.ObjectId(req.params.id);

    const data = await typeService.remove(_id);

    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    next(error);
  }
};

export { create, getAll, get, update, remove };
