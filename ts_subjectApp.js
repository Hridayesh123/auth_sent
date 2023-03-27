"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var ts_subjectRoutes_1 = require("./routes_container/ts_subjectRoutes");
var jsonwebtoken_1 = require("jsonwebtoken");
var app = (0, express_1.default)();
var key = "key";
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.post('/login', function (req, res) {
    var user = {
        firstname: req.body.firstname,
        password: req.body.password
    };
    jsonwebtoken_1.default.sign({ user: user }, key, function (err, token) {
        res.json({ token: token });
    });
});
app.post('/profile', verifyToken, function (req, res) {
    jsonwebtoken_1.default.verify(req.token, key, function (err, authData) {
        if (!err) {
            res.json({
                message: " authorized",
                authData: authData
            });
        }
    });
});
function verifyToken(req, res, next) {
    var bearerHeader = req.header['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        var token = bearer[1];
        req.token = token;
        next();
    }
}
app.use('/subject', ts_subjectRoutes_1.default);
app.listen(3000, function () {
    console.log("Server is running on port 3000");
});
