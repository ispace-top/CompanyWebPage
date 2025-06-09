require('dotenv').config({ path: './.env' });
const express = require('express');
const cors = require('cors');
const sequelize = require('./src/config/db');
const router = require('./src/routes/index');
const logger = require('./src/config/logger');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors()); // 允许跨域
app.use(express.json()); // 解析 JSON 请求体

// 挂载路由
app.use('/api', router);

// 同步数据库模型（首次启动时创建表）
sequelize.sync({ alter: true }) // 开发模式使用 alter: true 自动迁移表结构
  .then(() => {
    logger.info('数据库模型同步完成');
    app.listen(PORT, () => {
      logger.info(`服务器运行在 http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    logger.error(`数据库同步失败: ${error.message}`);
  });