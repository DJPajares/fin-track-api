import express from 'express';
import typesRouter from './type/';

const router = express.Router();

router.use('/api/types', typesRouter);

export default router;
