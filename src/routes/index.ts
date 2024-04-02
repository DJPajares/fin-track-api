import express from 'express';
import typesRouter from './type.route';

const router = express.Router();

router.use('/api/types', typesRouter);

export default router;
