"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../../config/database");
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
}
exports.default = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true
    },
    first_name: {
        type: sequelize_1.DataTypes.STRING
    },
    last_name: {
        type: sequelize_1.DataTypes.STRING
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
    modelName: 'user',
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
    sequelize: database_1.db
});
//# sourceMappingURL=user.js.map