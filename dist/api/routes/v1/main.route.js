"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *  @openapi
 *  /:
 *    get:
 *      summary: Main route
 *      description: Test main route
 *      tags:
 *      - main
 *      responses:
 *        200:
 *          description: Returns without error.
 */
const express_1 = require("express");
const { dirname } = require('path');
const appDir = dirname((_a = require.main) === null || _a === void 0 ? void 0 : _a.filename);
const route = (0, express_1.Router)();
route.get('/', (req, res) => {
    console.log(appDir);
    res.sendFile(appDir + '/public/index.html');
});
exports.default = route;
//# sourceMappingURL=main.route.js.map