const { StatusCodes } = require('http-status-codes');
const CompanyInfo = require('../models/CompanyInfo');
const logger = require('../config/logger');

exports.getCompanyInfo = async (req, res) => {
  try {
    const companyInfo = await CompanyInfo.findOne();
    res.status(StatusCodes.OK).json(companyInfo || {});
  } catch (err) {
    logger.error(`获取公司信息失败：${err.message}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: '服务器错误' });
  }
};

exports.updateCompanyInfo = async (req, res) => {
  try {
    const [updatedCount] = await CompanyInfo.update(req.body, { where: {} });
    if (updatedCount === 0) await CompanyInfo.create(req.body);
    res.status(StatusCodes.OK).json({ message: '公司信息更新成功' });
  } catch (err) {
    logger.error(`更新公司信息失败：${err.message}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: '服务器错误' });
  }
};