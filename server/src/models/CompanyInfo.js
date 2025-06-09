const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // 补充正确的 sequelize 实例导入

const CompanyInfo = sequelize.define('CompanyInfo', {
  company_name: { type: DataTypes.STRING(100), allowNull: false }, // 公司名称
  address: { type: DataTypes.STRING(200) }, // 地址
  email: { type: DataTypes.STRING(100) }, // 邮箱
  phone: { type: DataTypes.STRING(50) }, // 电话
  wechat: { type: DataTypes.STRING(50) }, // 微信
  wechat_public: { type: DataTypes.STRING(50) }, // 公众号
  registration_place: { type: DataTypes.STRING(100) }, // 注册地
  contact_person: { type: DataTypes.STRING(50) } // 联系人
});

module.exports = CompanyInfo;