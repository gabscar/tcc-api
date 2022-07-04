"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const interfaces_1 = require("../interfaces");
function login(params) {
    const { email, password } = params;
    if (!email || !password || !interfaces_1.emailRegex.test(email)) {
        return false;
    }
    return true;
}
exports.login = login;
//# sourceMappingURL=auth.validation.js.map