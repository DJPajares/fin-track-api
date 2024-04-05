import express from 'express';
import * as typeControllers from '../../controllers/v1/typeController';
import { TypeModel } from '../../models/v1/typeModel';
import pagination from '../../middleware/pagination';

const router = express.Router();

router.post('/', typeControllers.create);

router.get('/', pagination(TypeModel), typeControllers.getAll);

router.get('/:id', typeControllers.get);

router.put('/:id', typeControllers.update);

router.delete('/:id', typeControllers.remove);

export default router;
