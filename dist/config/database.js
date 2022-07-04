"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sequelize_1 = require("sequelize");
const logger_1 = require("../api/lib/logger");
function customLog(msg) {
    logger_1.default.debug(msg);
}
exports.db = new sequelize_1.Sequelize({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    dialect: 'postgres',
    logging: process.env.DB_LOG === 'true' ? customLog : false,
    timezone: 'Asia/Jakarta'
});
async function syncDB() {
    return await exports.db.sync();
}
exports.default = syncDB;
//# sourceMappingURL=database.js.map