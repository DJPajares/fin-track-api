import { NextFunction, Request, Response } from 'express';
import * as transactionPaymentService from '../../services/v1/transactionPaymentService';

const fetchTransactionPayments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const date = req.body.date;

  const data = await transactionPaymentService.fetchTransactionPayments(date);

  res.status(200).json({
    success: true,
    data
  });
};

export { fetchTransactionPayments };
