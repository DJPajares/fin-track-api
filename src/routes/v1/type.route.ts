import express from 'express';
import * as typeControllers from '../../controllers/v1/type.controller';

const router = express.Router();

router.post('/', typeControllers.create);

router.get('/', typeControllers.getAll);

router.get('/:id', typeControllers.get);

router.put('/:id', typeControllers.update);

router.delete('/:id', typeControllers.remove);

export default router;
