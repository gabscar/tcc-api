"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const interfaces_1 = require("../interfaces");
function register(params) {
    const { email, password, first_name, last_name } = params;
    if (!email ||
        !password ||
        !first_name ||
        !last_name ||
        !interfaces_1.emailRegex.test(email)) {
        return false;
    }
    return true;
}
exports.register = register;
//# sourceMappingURL=user.validation.js.map