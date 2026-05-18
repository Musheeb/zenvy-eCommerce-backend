const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

exports.sendEmail = async (email) => {
  const { data, error } = await resend.emails.send({
    from: process.env.FROM,
    to: email,
    subject: "Password Reset Link",
    html: `<strong> It works! </strong>`,
  });
  if (error) {
    console.log("Error in sendEamil method. Error: ", error);
    return error;
  }
  console.log("Email sent successfully. Data: ", data);
  return data;
};
