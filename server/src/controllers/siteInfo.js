const SiteInfo = require('../models/SiteInfo');
const logger = require('../config/logger');
const bcrypt = require('bcrypt');
const User = require('../models/User');

// 获取网站信息（公共接口）
exports.getSiteInfo = async (req, res) => {
  try {
    const siteInfo = await SiteInfo.findOne();
    res.json(siteInfo || {}); // 若未初始化返回空对象
  } catch (error) {
    logger.error(`获取网站信息失败: ${error.message}`);
    res.status(500).json({ message: '服务器内部错误' });
  }
};

// 更新网站信息（管理员接口）
exports.updateSiteInfo = async (req, res) => {
  try {
    const { 
      site_title, 
      logo_url, 
      banner_url, 
      nav_menus, 
      component_config, 
      theme_color, 
      copyright, 
      record_number 
    } = req.body;

    const [updatedCount] = await SiteInfo.update(
      { 
        site_title, 
        logo_url, 
        banner_url, 
        nav_menus, 
        component_config, 
        theme_color, 
        copyright, 
        record_number 
      },
      { where: {} } // 更新所有记录（实际应只有一条）
    );

    if (updatedCount === 0) {
      // 若不存在记录则创建
      await SiteInfo.create(req.body);
      logger.info('网站信息初始化成功');
      return res.json({ message: '网站信息初始化成功' });
    }

    logger.info('网站信息更新成功');
    res.json({ message: '网站信息更新成功' });
  } catch (error) {
    logger.error(`更新网站信息失败: ${error.message}`);
    res.status(500).json({ message: '服务器内部错误' });
  }
};

// 检查网站是否已初始化
exports.checkInitialized = async (req, res) => {
  try {
    console.log('[服务端] 收到初始化状态检查请求');
    const siteInfo = await SiteInfo.findOne();
    console.log(`[服务端] 初始化状态: ${!!siteInfo}`);
    res.json({ initialized: !!siteInfo });
  } catch (error) {
    console.error('[服务端] 检查初始化状态失败:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
};

// 网站初始化（首次配置）
exports.setup = async (req, res) => {
  const { siteTitle, adminPassword } = req.body;

  // 防止重复初始化
  const existingSite = await SiteInfo.findOne();
  if (existingSite) {
    logger.warn('重复初始化请求');
    return res.status(400).json({ message: '网站已初始化' });
  }

  // 1. 保存网站基础信息
  await SiteInfo.create({
    site_title: siteTitle,
    component_config: {
      header: true,
      banner: true,
      product_intro: true,
      customer_case: true,
      footer: true
    },
    theme_color: '#2D3446' // 默认主题色
  });

  // 2. 创建管理员账号（密码加密存储）
  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  await User.create({
    username: 'admin',
    password: hashedPassword,
    is_admin: true
  });

  logger.info('网站初始化成功');
  res.json({ message: '初始化成功' });
};