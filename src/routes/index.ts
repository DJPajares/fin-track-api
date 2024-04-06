import express from 'express';
import typesRoute from './v1/typeRoute';
import categoryRoute from './v1/categoryRoute';
import currencyRoute from './v1/currencyRoute';
import logRoute from './v1/logRoute';

const router = express.Router();

router.use('/api/v1/types', typesRoute);
router.use('/api/v1/categories', categoryRoute);
router.use('/api/v1/currencies', currencyRoute);
router.use('/api/v1/logs', logRoute);

export default router;
