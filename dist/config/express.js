"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const compression = require("compression");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const v1_1 = require("../api/routes/v1");
const middlewares_1 = require("../api/middlewares");
const constants_1 = require("../constants");
const swagger_1 = require("./swagger");
function expressConfig(app) {
    const corsOption = {
        origin: '*',
        credentials: true
    };
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cors(corsOption));
    app.use(compression());
    app.use(middlewares_1.morganMiddleware);
    app.use(`/${constants_1.API}`, v1_1.default);
    app.use(`/${constants_1.API}/docs`, swaggerUi.serve, swaggerUi.setup(swagger_1.specs));
    return app;
}
exports.default = expressConfig;
//# sourceMappingURL=express.js.map