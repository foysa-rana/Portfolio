import transporter from "../lib/nodemailer";
import emailFormatCode from "../lib/emailFormatCode";
import emailFormatLink from "../lib/emailFormatLink";

export const sendVerificationEmail = async (
  name: string,
  email: string,
  code: string
) => {
  try {
    await transporter.sendMail({
      from: `"Portfolio Verification" <${process.env.NODEMAILER_USER}>`,
      to: email,
      subject: "Portfolio Verification Code",
      html: emailFormatCode(name, email, code),
    });
    return { success: true, message: "Verification email sent successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Failed to send verification email" };
  }
};

export const sendResetEmail = async (
  name: string,
  email: string,
  link: string
) => {
  try {
    await transporter.sendMail({
      from: `"Password Reset" <${process.env.NODEMAILER_USER}>`,
      to: email,
      subject: "Password Reset",
      html: emailFormatLink(name, email, link),
    });
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Failed to send email" };
  }
};
