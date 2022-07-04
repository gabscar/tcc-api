"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.getMeta = void 0;
const services_1 = require("../services");
const validations_1 = require("../validations");
const logger_1 = require("../lib/logger");
async function getMeta(req, res) {
    const params = {
        userdata: req.params.userdata
    };
    const result = await services_1.authService.getMeta(params).catch((err) => {
        logger_1.default.error(err);
        res.status(400);
    });
    if (result) {
        res.status(200).send({
            success: true,
            payload: result
        });
    }
    else {
        res.status(400).send({ message: 'Not found' });
    }
}
exports.getMeta = getMeta;
async function login(req, res) {
    const params = req.body;
    if (validations_1.authValidation.login(params)) {
        const result = await services_1.authService.login(params).catch((err) => {
            logger_1.default.error(err);
            res.status(400);
        });
        res.status(200).send({
            success: true,
            payload: result
        });
    }
    else {
        res.status(403).send({ message: 'Validation failed' });
    }
}
exports.login = login;
//# sourceMappingURL=auth.controller.js.map