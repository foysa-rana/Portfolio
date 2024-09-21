"use client";
import "@/css/verify.css";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Verify = () => {
  const [verificationCode, setVerificationCode] = useState<string>("");
  const params = useSearchParams();
  const router = useRouter();

  const {
    authVerify,
    authResend,
    alert,
    resendTime,
    resendTimer,
    isLoading,
    resendLoading,
  } = useAuthContext();
  const changeHandller = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(e.target.value);
  };

  const submitHandller = (e: React.MouseEvent) => {
    e.preventDefault();
    authVerify({ userId: params.get("user"), verificationCode });
  };

  const resendHandller = async (e: React.MouseEvent) => {
    e.preventDefault();
    await authResend({ userId: params.get("user") });
  };

  useEffect(() => {
    if (alert && alert.success) {
      setVerificationCode("");
    }
    if (alert && alert.verificationSuccess) {
      setTimeout(() => {
        router.replace("/admin");
      }, 3000);
    }
    let timeOutId: NodeJS.Timeout;
    if (resendTime && resendTime > 0) {
      timeOutId = setTimeout(() => {
        resendTimer(resendTime - 1);
      }, 1000);
    }
    return () => clearTimeout(timeOutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alert, resendTimer]);
  console.log(resendTime);
  return (
    <div className="container">
      <h1>Verification Required</h1>
      <p>Please enter the verification code sent to your email.</p>

      <div className="input-container">
        <input
          type="text"
          name="verificationCode"
          placeholder="Enter verification code"
          required
          value={verificationCode}
          onChange={changeHandller}
        />
      </div>

      {alert && <p className="verify-warning">{alert.verificationCode}</p>}
      {alert && !alert.verificationCode && (
        <div className="verify-alert-container">
          <p
            className={`verify-alert ${
              alert.error ? "verify-error" : "verify-success"
            }`}
          >
            {alert.success || alert.error || alert.verificationSuccess}
          </p>
        </div>
      )}

      <button type="submit" onClick={submitHandller} disabled={isLoading}>
        {isLoading ? "Verifying" : "Verify"}
      </button>

      <div className="footer">
        Didn't receive the code?{" "}
        {resendTime > 0 ? (
          `Resend the code after ${resendTime} seconds`
        ) : (
          <button onClick={resendHandller} disabled={resendLoading}>
            {resendLoading ? "Resending" : "Resend"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Verify;
