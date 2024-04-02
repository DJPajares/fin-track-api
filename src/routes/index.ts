import express from 'express';
import typesRoutes from './type.route';
import categoryRoutes from './category.route';

const router = express.Router();

router.use('/api/types', typesRoutes);
router.use('/api/categories', categoryRoutes);

export default router;
