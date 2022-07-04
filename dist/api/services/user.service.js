"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.register = exports.findAll = void 0;
const repositories_1 = require("../repositories");
const bcrypt = require("bcrypt");
function findAll() {
    return new Promise(async (resolve) => {
        const users = await repositories_1.userRepository.findAll();
        resolve(users);
    });
}
exports.findAll = findAll;
function register(params) {
    return new Promise(async (resolve, reject) => {
        try {
            const isEmailExist = await repositories_1.loginRepository.isEmailExist(params.email);
            if (isEmailExist) {
                reject('Email exists');
            }
            const hashedPassword = await bcrypt.hashSync(params.password, 5);
            const registerUser = await repositories_1.userRepository.create({
                first_name: params.first_name,
                last_name: params.last_name
            });
            const registerlogin = await repositories_1.loginRepository.create({
                email: params.email,
                password: hashedPassword,
                user_id: registerUser === null || registerUser === void 0 ? void 0 : registerUser.getDataValue('id')
            });
            if (!registerlogin) {
                reject('Failed to register');
            }
            resolve(registerlogin);
        }
        catch (err) {
            reject(err);
        }
    });
}
exports.register = register;
function remove(params) {
    return new Promise(async (resolve, reject) => {
        try {
            const removed = await repositories_1.loginRepository.remove(params.id);
            resolve(removed);
        }
        catch (err) {
            reject(err);
        }
    });
}
exports.remove = remove;
//# sourceMappingURL=user.service.js.map