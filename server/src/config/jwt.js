require('dotenv').config({ path: `${__dirname}/../../.env` });

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '24h'
};