"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.register = void 0;
const services_1 = require("../services");
const validations_1 = require("../validations");
const logger_1 = require("../lib/logger");
async function register(req, res) {
    const params = req.body;
    if (validations_1.userValidation.register(params)) {
        const result = await services_1.userService.register(params).catch((err) => {
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
exports.register = register;
async function remove(req, res) {
    const params = req.body;
    if (params.id) {
        const result = await services_1.userService.remove(params).catch((err) => {
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
exports.remove = remove;
//# sourceMappingURL=user.controller.js.map