"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const express = require("express");
const config_1 = require("./config");
function createServer() {
    const app = (0, config_1.expressConfig)(express());
    return app;
}
exports.createServer = createServer;
//# sourceMappingURL=server.js.map