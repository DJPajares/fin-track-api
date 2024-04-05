import express from 'express';
import * as categoryController from '../../controllers/v1/category.controller';

const router = express.Router();

router.post('/', categoryController.create);

router.get('/', categoryController.getAll);

router.get('/:id', categoryController.get);

router.put('/:id', categoryController.update);

router.delete('/:id', categoryController.remove);

export default router;
