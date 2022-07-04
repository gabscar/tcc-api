"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../../controllers");
const middlewares_1 = require("../../middlewares");
const route = (0, express_1.Router)();
route.post('/register', [], (req, res) => {
    controllers_1.userController.register(req, res);
});
route.put('/remove', [middlewares_1.authorization], (req, res) => {
    controllers_1.userController.remove(req, res);
});
exports.default = route;
//# sourceMappingURL=user.route.js.map