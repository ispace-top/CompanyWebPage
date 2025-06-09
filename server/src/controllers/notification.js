const { StatusCodes } = require('http-status-codes');
const NotificationLog = require('../models/NotificationLog');
const EmailNotifier = require('../notifications/email');
const logger = require('../config/logger');

const emailNotifier = new EmailNotifier();

exports.sendNotification = async (req, res) => {
  try {
    const { target, type, content } = req.body;
    let result;

    if (type === 'email') {
      result = await emailNotifier.send(target, '企业官网通知', content);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: '不支持的通知类型' });
    }

    await NotificationLog.create({
      target,
      type,
      content,
      status: 'success'
    });

    res.status(StatusCodes.OK).json({ message: '通知发送成功' });
  } catch (err) {
    await NotificationLog.create({
      target: req.body.target,
      type: req.body.type,
      content: req.body.content,
      status: 'failed',
      errorMsg: err.message
    });
    logger.error(`通知发送失败：${err.message}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: '通知发送失败' });
  }
};