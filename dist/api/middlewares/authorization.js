"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = require("../helpers/token");
const repositories_1 = require("../repositories");
async function authorization(req, res, next) {
    const authorization = String(req.headers['x-authorization']);
    if (!authorization || !authorization.includes('Bearer')) {
        res.status(401).send({
            status: false,
            msg: 'unauthorized'
        });
        return;
    }
    const token = authorization === null || authorization === void 0 ? void 0 : authorization.slice(7);
    const payload = await (0, token_1.verifyToken)(token).catch(() => {
        res.status(401).send({
            status: false,
            msg: 'unauthorized'
        });
        return;
    });
    if (!payload) {
        res.status(401).send({
            status: false,
            msg: 'unauthorized'
        });
        return;
    }
    repositories_1.loginRepository.findOne(payload.sub).then((userdata) => {
        if (!userdata) {
            res.status(401).send({
                status: false,
                msg: 'unauthorized'
            });
            return;
        }
        req.params.userdata = userdata === null || userdata === void 0 ? void 0 : userdata.getDataValue('email');
        next();
    });
}
exports.default = authorization;
//# sourceMappingURL=authorization.js.map