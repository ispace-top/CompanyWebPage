const nodemailer = require('nodemailer');
const logger = require('../config/logger');

class EmailNotifier {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }

  async send(to, subject, content) {
    return this.transporter.sendMail({
      from: `"企业官网" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: content
    });
  }
}

module.exports = EmailNotifier;