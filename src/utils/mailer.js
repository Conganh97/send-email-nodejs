const ejs = require("ejs");
const fs = require("fs");
const nodeMailer = require("nodemailer");
const adminEmail = "anhbc.afsystem@gmail.com";
const adminPassword = "rljl nnnu ejal apxq";
// host của google - gmail
const mailHost = "smtp.gmail.com";
// 587 là một cổng tiêu chuẩn và phổ biến trong giao thức SMTP
const mailPort = 587;

const sendMail = (to, subject, htmlContent) => {
  console.log("🚀 ~ file: mailer.js:19 ~ sendMail ~ htmlContent:", htmlContent);
  // Khởi tạo một thằng transporter object sử dụng chuẩn giao thức truyền tải SMTP với các thông tin cấu hình ở trên.
  const transporter = nodeMailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: false, // nếu dùng port 465 (smtps) thì để true, còn lại hãy để false cho tất cả các port khác
    auth: {
      user: adminEmail,
      pass: adminPassword,
    },
  });

  const options = {
    from: adminEmail,
    to: to,
    subject: subject,
  };

  fs.readFile(__dirname + "/template.ejs", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const renderedData = ejs.render(data, { otp: htmlContent });

    options = { ...options, html: renderedData };
    return transporter.sendMail(options);
  });
};

module.exports = {
  sendMail: sendMail,
};
