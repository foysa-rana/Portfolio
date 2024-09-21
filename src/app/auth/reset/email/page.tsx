"use client";
import "@/css/verify.css";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ResetEmail = () => {
  const [email, setEmail] = useState<string>("");

  const router = useRouter();

  const { resetingPasswordEmail, alert, isLoading, user } = useAuthContext();
  const changeHandller = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const submitHandller = (e: React.MouseEvent) => {
    e.preventDefault();
    resetingPasswordEmail(email);
  };

  useEffect(() => {
    if (alert && alert.success) {
      setEmail("");
    }
    let timoutId: NodeJS.Timeout;
    if (alert && alert.unverifiedUser) {
      setEmail("");
      timoutId = setTimeout(() => {
        router.replace(`/auth/verify?user=${user.userId}`);
      }, 3000);
    }
    return () => clearTimeout(timoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alert]);
  return (
    <div className="container">
      <h1>Forgot Passowrd</h1>
      <p>
        Enter your email address below, and we'll send you a link to reset your
        password.
      </p>

      <div className="input-container">
        <input
          type="text"
          name="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={changeHandller}
        />
      </div>

      {alert && <p className="verify-warning">{alert.email}</p>}
      {alert && !alert.email && (
        <div className="verify-alert-container">
          <p
            className={`verify-alert ${
              alert.success ? "verify-success" : "verify-error"
            }`}
          >
            {alert.success || alert.error || alert.unverifiedUser}
          </p>
        </div>
      )}

      <button type="submit" onClick={submitHandller} disabled={isLoading}>
        {isLoading ? "Proccessing" : "Submit"}
      </button>
    </div>
  );
};

export default ResetEmail;
