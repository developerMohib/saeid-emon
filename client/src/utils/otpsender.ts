import instance from "@/hooks/instance";

export const sendOtpRequest = (email: string) =>
  instance.post("/auth/send-otp", { email });

export const verifyOtpRequest = (email: string, otp: string) =>
  instance.post("/auth/verify-otp", { email, otp });
