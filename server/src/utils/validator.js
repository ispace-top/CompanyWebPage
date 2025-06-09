const logger = require('../config/logger');

const validateUserInput = (requiredFields) => {
  return (req, res, next) => {
    const missingFields = requiredFields.filter(field => !req.body[field]);
    if (missingFields.length > 0) {
      logger.warn(`缺少必填参数: ${missingFields.join(', ')}`);
      return res.status(400).json({ 
        message: `缺少必填参数: ${missingFields.join(', ')}` 
      });
    }
    next();
  };
};

module.exports = { validateUserInput };