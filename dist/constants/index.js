"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.API = exports.PORT = void 0;
const PORT = process.env.PORT || 3000;
exports.PORT = PORT;
const API = process.env.API || 'api/v1';
exports.API = API;
const JWT_SECRET = process.env.JWT_SECRET || 'j!89nKO5as&Js';
exports.JWT_SECRET = JWT_SECRET;
//# sourceMappingURL=index.js.map