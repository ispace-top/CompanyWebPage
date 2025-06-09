const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const SiteInfo = sequelize.define('SiteInfo', {
  site_title: { type: DataTypes.STRING(100), allowNull: false },
  logo_url: { type: DataTypes.STRING(255) },
  banner_url: { type: DataTypes.STRING(255) },
  nav_menus: { 
    type: DataTypes.JSON,
    defaultValue: [] // 默认空菜单数组
  },
  component_config: {
    type: DataTypes.JSON,
    defaultValue: { // 默认组件显隐配置
      header: true,
      banner: true,
      product_intro: true,
      customer_case: true,
      footer: true
    }
  },
  theme_color: { type: DataTypes.STRING(7), defaultValue: '#2D3446' },
  copyright: { type: DataTypes.STRING(200) },
  record_number: { type: DataTypes.STRING(50) }
});

module.exports = SiteInfo;