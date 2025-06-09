require('dotenv').config({ path: `${__dirname}/../../.env` });
const { Sequelize } = require('sequelize');

// SQLite 配置（无需用户名/密码，通过 storage 指定数据库文件路径）
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './server/database.sqlite', // 数据库文件存储路径（自动创建）
  logging: false, // 关闭 SQL 日志（开发时可设为 console.log）
  define: {
    timestamps: true, // 自动添加 createdAt/updatedAt
    underscored: true // 字段名使用蛇形命名（如 site_title）
  }
});

// 测试数据库连接（无需修改）
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('数据库连接成功');
  } catch (error) {
    console.error('数据库连接失败:', error);
  }
}

testConnection();

module.exports = sequelize;