import express from 'express';
import {
  createType,
  getType,
  updateType,
  deleteType
} from '../services/type.service';

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const data = await createType(req.body);

    res.status(200).send({
      success: true,
      data
    });
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const data = await getType(req);

    res.status(200).send({
      success: true,
      data
    });
  } catch (error) {
    next(error);
  }
});

router.put('/', async (req, res, next) => {
  try {
    const data = await updateType(req.body);

    res.status(200).send({
      success: true,
      data
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/', async (req, res, next) => {
  try {
    var data = await deleteType(req.body);

    res.status(200).send({
      success: true,
      data
    });
  } catch (error) {
    next(error);
  }
});

export default router;
