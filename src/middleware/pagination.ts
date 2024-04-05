import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import { PaginationRequestProps } from '../types/commonTypes';

const pagination = (Model: Model<any, any>) => {
  return async (
    req: PaginationRequestProps,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { page = '1', limit = '10' } = req.query as {
        page?: string;
        limit?: string;
      };

      const skip = (parseInt(page) - 1) * parseInt(limit);

      const totalCollection = await Model.countDocuments();
      const totalPages = Math.ceil(totalCollection / parseInt(limit));

      res.locals.pagination = {
        totalCollection,
        totalPages,
        limit: parseInt(limit),
        page: parseInt(page)
      };

      req.paginationQuery = {
        skip,
        limit: parseInt(limit)
      };

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default pagination;
