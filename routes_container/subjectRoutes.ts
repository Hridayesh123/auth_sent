import express, { Request, Response } from 'express';
import client from '../config/db';
import {
  getSubject,
  getSubjectsById,
  createSubject,
  updateSubject,
  deleteSubject,
} from '../function_container/subjectFunctions';

const router = express.Router();

router.get('/', getSubject);

router.get('/:id', getSubjectsById);

router.post('/', createSubject);

router.put('/:id', updateSubject);

router.delete('/:id', deleteSubject);

export default router;
