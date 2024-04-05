import express from 'express';
import typesRoutes from './v1/type.route';
import categoryRoutes from './v1/category.route';

const router = express.Router();

router.use('/api/v1/types', typesRoutes);
router.use('/api/v1/categories', categoryRoutes);

export default router;
