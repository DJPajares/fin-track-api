import express from 'express';
import typesRoute from './v1/typeRoute';
import categoryRoute from './v1/categoryRoute';

const router = express.Router();

router.use('/api/v1/types', typesRoute);
router.use('/api/v1/categories', categoryRoute);

export default router;
