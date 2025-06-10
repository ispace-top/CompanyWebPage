const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../utils/auth');
const { validateUserInput } = require('../utils/validator');
const siteInfoCtrl = require('../controllers/siteInfo');
const companyInfoCtrl = require('../controllers/companyInfo');
const userCtrl = require('../controllers/user');
const notificationCtrl = require('../controllers/notification');

// 无需认证的接口（注册、登录、公共信息查询）
router.get('/site-info', siteInfoCtrl.getSiteInfo); // 公共接口：获取网站信息
router.get('/company-info', companyInfoCtrl.getCompanyInfo); // 公共接口：获取公司信息
router.get('/check-initialized', siteInfoCtrl.checkInitialized); // 新增：供前端检查初始化状态的接口
router.post('/register', validateUserInput(['username', 'password']), userCtrl.registerAdmin); // 注册接口（仅首次可用）
router.post('/login', validateUserInput(['username', 'password']), userCtrl.login); // 登录接口（获取token）

// 公共接口（无需认证）
router.post('/setup', siteInfoCtrl.setup); // 新增初始化提交接口

// 以下接口需要认证（通过JWT校验）
router.use(authMiddleware); // 应用认证中间件到后续所有路由
router.post('/site-info', siteInfoCtrl.updateSiteInfo); // 管理员接口：更新网站信息
router.post('/company-info', companyInfoCtrl.updateCompanyInfo); // 管理员接口：更新公司信息
router.post('/notifications', notificationCtrl.sendNotification); // 管理员接口：发送通知

module.exports = router;