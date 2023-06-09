"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ts_subjectFunctions_1 = require("../function_container/ts_subjectFunctions");
var router = express_1.default.Router();
router.get('/', ts_subjectFunctions_1.getSubject);
router.get('/:id', ts_subjectFunctions_1.getSubjectsById);
router.post('/', ts_subjectFunctions_1.createSubject);
router.put('/:id', ts_subjectFunctions_1.updateSubject);
router.delete('/:id', ts_subjectFunctions_1.deleteSubject);
exports.default = router;
