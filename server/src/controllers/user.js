const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/jwt');
const logger = require('../config/logger');

// 管理员注册（仅允许初始化时调用）
exports.registerAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingAdmin = await User.findOne({ where: { is_admin: true } });
    
    if (existingAdmin) {
      logger.warn('尝试重复注册管理员');
      return res.status(400).json({ message: '管理员已存在' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashedPassword, is_admin: true });
    
    logger.info('管理员注册成功');
    res.status(201).json({ message: '注册成功' });
  } catch (error) {
    logger.error(`注册失败: ${error.message}`);
    res.status(500).json({ message: '服务器内部错误' });
  }
};

// 用户登录
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      logger.warn(`登录失败：用户 ${username} 密码错误`);
      return res.status(401).json({ message: '账号或密码错误' });
    }

    const token = jwt.sign(
      { userId: user.id, isAdmin: user.is_admin },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
    
    logger.info(`用户 ${username} 登录成功`);
    res.json({ token });
  } catch (error) {
    logger.error(`登录失败: ${error.message}`);
    res.status(500).json({ message: '服务器内部错误' });
  }
};