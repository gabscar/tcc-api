"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.getMeta = void 0;
const repositories_1 = require("../repositories");
const token_1 = require("../helpers/token");
const bcrypt = require("bcrypt");
function getMeta(params) {
    return new Promise(async (resolve) => {
        const login = await repositories_1.loginRepository.getMeta(params.userdata);
        resolve(login);
    });
}
exports.getMeta = getMeta;
function login(params) {
    return new Promise(async (resolve, reject) => {
        try {
            const login = await repositories_1.loginRepository.findOne(params.email);
            if (!login) {
                reject('Email is not exists');
            }
            const isValid = await bcrypt.compareSync(params.password, login === null || login === void 0 ? void 0 : login.getDataValue('password'));
            if (!isValid) {
                reject('Invalid password');
            }
            const expires = '1d';
            const token = await (0, token_1.signToken)(params.email, expires);
            if (!token) {
                reject('Invalid token');
            }
            resolve({
                token: `Bearer ${token}`,
                expires: expires
            });
        }
        catch (err) {
            reject(err);
        }
    });
}
exports.login = login;
//# sourceMappingURL=auth.service.js.map