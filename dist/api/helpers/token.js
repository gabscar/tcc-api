"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.signToken = void 0;
const constants_1 = require("../../constants");
const jwt = require("jsonwebtoken");
function signToken(id, expires) {
    return new Promise((resolve, reject) => {
        jwt.sign({
            sub: id,
            iat: Date.now()
        }, constants_1.JWT_SECRET, {
            expiresIn: expires
        }, (err, token) => {
            if (err) {
                reject(err);
            }
            resolve(token);
        });
    });
}
exports.signToken = signToken;
function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, constants_1.JWT_SECRET, (err, decoded) => {
            if (err) {
                reject(err);
            }
            resolve(decoded);
        });
    });
}
exports.verifyToken = verifyToken;
//# sourceMappingURL=token.js.map