"use strict";
const express= require('express');
const router = express.Router();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubject = exports.updateSubject = exports.createSubject = exports.getSubjectsById = exports.getSubject = void 0;
var db_1 = require("../config/db");
function getSubject(req, res) {
    db_1.default.query('SELECT * FROM subjects', function (err, result) {
        if (!err) {
            res.send(result.rows);
        }
        else {
            console.log(err.message);
            res.sendStatus(500);
        }
    });
    db_1.default.end();
}
exports.getSubject = getSubject;
function getSubjectsById(req, res) {
    db_1.default.query("SELECT * FROM subjects WHERE id=".concat(req.params.id), function (err, result) {
        if (!err) {
            res.send(result.rows);
        }
        else {
            console.log(err.message);
            res.sendStatus(500);
        }
    });
    db_1.default.end();
}
exports.getSubjectsById = getSubjectsById;
function createSubject(req, res) {
    db_1.default.query("INSERT INTO subjects(name, code) VALUES('".concat(req.body.name, "','").concat(req.body.code, "')"), function (err, result) {
        if (!err) {
            res.send("successfully inserted");
        }
        else {
            console.log(err.message);
            res.sendStatus(500);
        }
    });
    db_1.default.end();
}
exports.createSubject = createSubject;
function updateSubject(req, res) {
    db_1.default.query("UPDATE subjects SET name = '".concat(req.body.name, "', code = '").concat(req.body.code, "' WHERE id = ").concat(req.params.id), function (err, result) {
        if (!err) {
            res.send("successfully updated");
        }
        else {
            console.log(err.message);
            res.sendStatus(500);
        }
    });
    db_1.default.end();
}
exports.updateSubject = updateSubject;
function deleteSubject(req, res) {
    db_1.default.query("DELETE FROM subjects WHERE id=".concat(req.params.id, " "), function (err, result) {
        if (!err) {
            res.send('successfully deleted');
        }
        else {
            console.log(err.message);
            res.sendStatus(500);
        }
    });
    db_1.default.end();
}
exports.deleteSubject = deleteSubject;
