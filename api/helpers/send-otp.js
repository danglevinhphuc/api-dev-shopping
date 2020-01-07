var nodemailer = require("nodemailer");
module.exports = {
  friendlyName: "Send mail",
  description: "Send mail",
  inputs: {
    otp: { type: "string", required: true },
    username: { type: "string", required: true },
    email: { type: "string", required: true },
    isGenerate: {type: 'boolean', defaultsTo: true},
    subject: {type: 'string',defaultsTo: "OTP Active Account"}
  },
  exits: {},
  fn: async function(inputs, exits) {
    // create reusable transporter object using the default SMTP transport
    var blockMinute = 5;
    var transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: sails.config.custom.email.user,
        pass: sails.config.custom.email.pass
      }
    });
    var objectGenerateBase64 = {
      username: inputs.username,
      otp: inputs.otp
    };
    var stringObjectGenerateBase64 = JSON.stringify(objectGenerateBase64);
    var getDataFromRedis = await sails.helpers.getRedis.with({
      key: { key: stringObjectGenerateBase64, type: "otp" }
    });
    var dataGenerateBase64= Buffer.from(stringObjectGenerateBase64).toString('base64');
    if(checkNextActionRedis(getDataFromRedis)){
      addCountOtpFail(getDataFromRedis, stringObjectGenerateBase64, blockMinute);
    }else{
      return exits.success({ success: false,error: `Lock account ${blockMinute} minutes` });
    }
    var mailOptions = {
      from: "OTP", // sender address
      to: inputs.email, // list of receivers
      subject: inputs.subject, // Subject line
      html: `
      <body style="background: #eff2f7; font-family: Roboto,Helvetica Neue,Helvetica,Arial,sans-serif; font-size: 14px; line-height:22px">
          <table style="max-width:750px; margin: 0 auto;" cellpadding="0" cellspacing="0" border="0" bgcolor="white">
              <tr bgcolor="#00a6ff" style="height: 50px">
                  <th style="padding: 20px 20px 20px 20px; color: #fff; font-size: 30px; font-weight: normal; border-top-right-radius: 5px; border-top-left-radius: 5px; text-align: left;" bgcolor="#00a6ff">OTP</th>
              </tr>
              <tr bgcolor="white">
                  <td style="padding: 30px 20px 20px 20px; text-align: left;">
                    <strong>Hi ${inputs.email} <br/>Code OTP: ${inputs.otp}</strong> <br/><br/>
                    ${inputs.isGenerate ?`Or click to below :`: '' }
                  </td>
              </tr>
              ${inputs.isGenerate ?
              `<tr bgcolor="white">
                <td style="padding: 0px 20px 20px 20px; text-align: left;">
                <table style="width:100% ;padding: 10px 15px 10px 15px; text-align: center; font-size: 25px;border-radius: 5px" cellpadding="0" cellspacing="0" border="0" bgcolor="#00a6ff">
                  <tr>
                    <td style="color: white">
                    <a href="${sails.config.custom.urlRedirect}account/verify/${dataGenerateBase64}" style="color:white; text-decoration:none; font-size: 16px; font-weight: bold;cursor:pointer">CLICK HERE</a>
                    </td>
                  </tr>
                </table>
              </td>`: ''}
          </table>
      </body>
      ` // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: " + info.response);
    });
    return exits.success({ success: true });
  }
};
function checkNextActionRedis(getDataFromRedis){
  if(!getDataFromRedis ||
    (getDataFromRedis && !getDataFromRedis.data) ||
    (getDataFromRedis &&
      getDataFromRedis.data &&
      getDataFromRedis.data.data.count < 4) ||
    (getDataFromRedis &&
      getDataFromRedis.data &&
      getDataFromRedis.data.data.count >= 4 &&
      getDataFromRedis.data.expired < new Date().getTime())){
        // next
        return true;
      }
    return false
}
async function addCountOtpFail(getDataFromRedis, key, blockMinute) {
  var expired = new Date().getTime() + blockMinute * 60000;
  // var expired = new Date().getTime() + 10000;
  if (!getDataFromRedis || (getDataFromRedis && !getDataFromRedis.data)) {
    // set redis
    //
    await sails.helpers.setRedis.with({
      key,
      type: "otp",
      data: { count: 1 },
      expired
    });
  } else if (
    getDataFromRedis &&
    getDataFromRedis.data.data &&
    getDataFromRedis.data.data.count < 4
  ) {
    await sails.helpers.setRedis.with({
      key,
      type: "otp",
      data: { count: getDataFromRedis.data.data.count + 1 },
      expired: getDataFromRedis.data.expired
    });
  } else if (
    getDataFromRedis &&
    getDataFromRedis.data.data &&
    getDataFromRedis.data.data.count >= 4 &&
    getDataFromRedis.data.expired < new Date().getTime()
  ) {
    await sails.helpers.setRedis.with({
      key,
      type: "otp",
      data: { count: 1 },
      expired
    });
  }
}
