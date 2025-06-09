const SiteInfo = require('../models/SiteInfo');
const logger = require('../config/logger');

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