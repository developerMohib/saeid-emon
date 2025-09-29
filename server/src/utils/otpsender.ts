import { sendEmail } from "./sendEmail";
export const otpStore: Record<string, { otp: string; expiresAt: number }> = {};
export const otpsender = async (email: string) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = {
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000, // 5 mins
  };

  await sendEmail(email, "Your OTP Code", `Your OTP is: ${otp}`);
  return otp;
};
