const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/jwt');
const logger = require('../config/logger');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // 格式：Bearer <token>
  
  if (!token) {
    logger.warn('未提供认证令牌');
    return res.status(401).json({ message: '需要登录认证' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      logger.error(`无效令牌: ${err.message}`);
      return res.status(403).json({ message: '无效或过期的令牌' });
    }
    req.user = decoded; // 将用户信息挂载到请求对象
    next();
  });
};

module.exports = { authMiddleware };