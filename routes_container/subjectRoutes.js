const express =  require('express');
const router = express.Router();
const client =  require('../config/db');
const { getSubject , getSubjectsById, createSubject, updateSubject, deleteSubject } = require('../function_container/subjectFunctions');



router.get('/', getSubject);

router.get('/:id', getSubjectsById);

router.post('/', createSubject);

router.put('/:id', updateSubject);

router.delete('/:id', deleteSubject);

module.exports = router;