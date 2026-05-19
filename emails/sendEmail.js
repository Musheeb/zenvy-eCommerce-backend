const { Resend } = require("resend");
const {
  forgotPasswordTemplate,
} = require("./templates/forgetPassword.template");
const resend = new Resend(process.env.RESEND_API_KEY);

exports.sendEmail = async (resetPasswordLink, email) => {
  const { data, error } = await resend.emails.send({
    from: process.env.FROM,
    to: email,
    subject: "Password Reset - Zenvy E-Commerce",
    html: forgotPasswordTemplate(resetPasswordLink),
  });
  if (error) {
    console.log("Error in sendEamil method. Error: ", error);
    return error;
  }
  console.log("Email sent successfully. Data: ", data);
  return data;
};
