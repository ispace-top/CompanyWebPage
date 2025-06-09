const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // 补充正确的 sequelize 实例导入

const NotificationLog = sequelize.define('NotificationLog', {
  type: { type: DataTypes.STRING(50), allowNull: false }, // 通知类型（email/wechat等）
  target: { type: DataTypes.STRING(255), allowNull: false }, // 通知目标（邮箱/微信ID）
  content: { type: DataTypes.TEXT, allowNull: false }, // 通知内容
  status: { type: DataTypes.STRING(20), defaultValue: 'pending' }, // 状态（pending/success/failed）
  error_message: { type: DataTypes.TEXT } // 失败时的错误信息
});

module.exports = NotificationLog;