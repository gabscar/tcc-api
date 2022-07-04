"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *  @openapi
 *  /auth:
 *    get:
 *      summary: Get meta data
 *      description: Get meta data from token
 *      tags:
 *      - auth
 *      parameters:
 *      - in: header
 *        name: x-authorization
 *        description: Token to be passed as a header
 *        required: true
 *      responses:
 *        200:
 *          description: Returns without error.
 *          content:
 *            'application/json': {}
 *        400:
 *          description: Bad Request
 *        401:
 *          description: Unauthorized
 *  @openapi
 *  /auth/login:
 *    post:
 *      summary: Login
 *      description: Login
 *      tags:
 *      - auth
 *      requestBody:
 *        description: Login body
 *        content:
 *          'application/json':
 *            schema:
 *              properties:
 *                email:
 *                  description: User Email
 *                  type: string
 *                  format: email
 *                password:
 *                  description: User password
 *                  type: string
 *              required:
 *              - email
 *              - password
 *              example:
 *                email: 'miftahul97@gmail.com'
 *                password: '12345'
 *        required: true
 *      responses:
 *        200:
 *          description: Returns without error.
 *          content:
 *            'application/json': {}
 *        400:
 *          description: Bad Request
 *        403:
 *          description: Validation failed
 */
const express_1 = require("express");
const controllers_1 = require("../../controllers");
const middlewares_1 = require("../../middlewares");
const route = (0, express_1.Router)();
route.get('/', [middlewares_1.authorization], (req, res) => {
    controllers_1.authController.getMeta(req, res);
});
route.post('/login', [], (req, res) => {
    controllers_1.authController.login(req, res);
});
exports.default = route;
//# sourceMappingURL=auth.route.js.map