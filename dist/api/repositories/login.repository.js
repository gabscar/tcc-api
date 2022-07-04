"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.getMeta = exports.findOne = exports.create = exports.isEmailExist = void 0;
const models_1 = require("../models");
async function isEmailExist(email) {
    return new Promise(async (resolve, reject) => {
        const login = await models_1.Login.findOne({
            where: {
                email: email
            }
        }).catch((err) => {
            reject(err);
        });
        if (!login) {
            resolve(false);
        }
        resolve(true);
    });
}
exports.isEmailExist = isEmailExist;
async function create(data) {
    return new Promise(async (resolve, reject) => {
        const login = await models_1.Login.create(data).catch((err) => {
            reject(err);
        });
        if (!login) {
            resolve(false);
        }
        resolve(true);
    });
}
exports.create = create;
async function findOne(email) {
    return new Promise(async (resolve) => {
        const login = await models_1.Login.findOne({
            where: {
                email: email,
                is_active: true
            }
        });
        resolve(login);
    });
}
exports.findOne = findOne;
async function getMeta(email) {
    return new Promise(async (resolve) => {
        const login = await models_1.Login.findOne({
            attributes: ['id', 'email', 'user_id', 'is_verify'],
            where: {
                email: email,
                is_active: true
            }
        });
        resolve(login);
    });
}
exports.getMeta = getMeta;
async function remove(id) {
    return new Promise(async (resolve) => {
        const [result, _] = await models_1.Login.update({
            is_active: false
        }, {
            where: {
                id: id
            }
        });
        if (!result) {
            resolve(false);
        }
        resolve(true);
    });
}
exports.remove = remove;
//# sourceMappingURL=login.repository.js.map