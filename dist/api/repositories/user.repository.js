"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAll = exports.create = void 0;
const models_1 = require("../models");
async function create(data) {
    return new Promise(async (resolve, reject) => {
        const user = await models_1.User.create(data).catch((err) => {
            reject(err);
        });
        resolve(user);
    });
}
exports.create = create;
async function findAll() {
    return await models_1.User.findAll();
}
exports.findAll = findAll;
//# sourceMappingURL=user.repository.js.map