"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const main_route_1 = require("./main.route");
const user_route_1 = require("./user.route");
const auth_route_1 = require("./auth.route");
const image_route_1 = require("./image.route");
const router = (0, express_1.Router)();
router.use('/', main_route_1.default);
router.use('/auth', auth_route_1.default);
router.use('/user', user_route_1.default);
router.use('/image', image_route_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map