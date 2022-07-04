"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../../config/database");
const sequelize_1 = require("sequelize");
const user_1 = require("./user");
class Login extends sequelize_1.Model {
}
exports.default = Login;
Login.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    is_verify: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    is_active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.Sequelize.fn('now'),
        allowNull: false
    },
    created_by: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: 'system',
        allowNull: false
    }
}, {
    modelName: 'login',
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
    sequelize: database_1.db
});
Login.belongsTo(user_1.default, {
    foreignKey: 'user_id'
});
//# sourceMappingURL=login.js.map