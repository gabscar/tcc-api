"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const logger_1 = require("./api/lib/logger");
const config_1 = require("./config");
const constants_1 = require("./constants");
const server_1 = require("./server");
function startServer() {
    const app = (0, server_1.createServer)();
    return app.listen(constants_1.PORT, async () => {
        await (0, config_1.syncDB)();
        logger_1.default.debug(`Server is listening on port ${constants_1.PORT}`);
    });
}
exports.startServer = startServer;
startServer();
//# sourceMappingURL=index.js.map