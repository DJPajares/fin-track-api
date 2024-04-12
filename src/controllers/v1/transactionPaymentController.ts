import { NextFunction, Request, Response } from 'express';
import * as transactionPaymentService from '../../services/v1/transactionPaymentService';

const fetchTransactionPayments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { date } = req.body;

    const data = await transactionPaymentService.fetchTransactionPayments(date);

    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    next(error);
  }
};

export { fetchTransactionPayments };
