const { Resend } = require("resend");
import { forgotPasswordTemplate } from "./templates/forgetPassword.template";
const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (resetPasswordLink: string | null, email: string) => {
  if (!resetPasswordLink) throw new Error("password link not found.");
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

export default sendEmail;
