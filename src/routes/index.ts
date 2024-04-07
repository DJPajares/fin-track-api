import express from 'express';
import typesRoute from './v1/typeRoute';
import categoryRoute from './v1/categoryRoute';
import currencyRoute from './v1/currencyRoute';
import paymentRoute from './v1/paymentRoute';
import transactionRoute from './v1/transactionRoute';

const router = express.Router();

router.use('/api/v1/types', typesRoute);
router.use('/api/v1/categories', categoryRoute);
router.use('/api/v1/currencies', currencyRoute);
router.use('/api/v1/payments', paymentRoute);
router.use('/api/v1/transactions', transactionRoute);

export default router;
