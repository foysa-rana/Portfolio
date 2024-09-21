"use client";
import "@/css/verify.css";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const ResetPaasword = () => {
  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
    passwordMatched: true,
  });

  const router = useRouter();
  const paramas = useSearchParams();

  const { alert, isLoading, user, resetingPassword } = useAuthContext();
  const changeHandller = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
      passwordMatched: true,
    });
  };

  const showPasswordHandler = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const showConfirmPasswordHandler = () => {
    setValues({ ...values, showConfirmPassword: !values.showConfirmPassword });
  };

  const submitHandller = (e: React.MouseEvent) => {
    e.preventDefault();
    if (values.password !== values.confirmPassword) {
      setValues({
        ...values,
        passwordMatched: false,
      });
      return;
    }
    resetingPassword(values.password, paramas.get("user"), paramas.get("code"));
  };

  useEffect(() => {
    let timoutId: NodeJS.Timeout;
    if (alert && alert.resetSuccess) {
      setValues({
        ...values,
        password: "",
        confirmPassword: "",
        showPassword: false,
      });
      timoutId = setTimeout(() => {
        router.replace(`/admin`);
      }, 3000);
    }
    return () => clearTimeout(timoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alert]);
  return (
    <div className="container">
      <h1>Reset Passowrd</h1>
      <p>Enter your new password below, to reset your password.</p>

      <div className="input-container">
        <input
          type={values.showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          required
          value={values.password}
          onChange={changeHandller}
        />
        <span className="show-hide" onClick={showPasswordHandler}>
          {values.showPassword ? (
            <i className="ri-eye-off-line"></i>
          ) : (
            <i className="ri-eye-line"></i>
          )}
        </span>
      </div>
      {alert && (
        <p
          className="verify-warning"
          style={{ textAlign: "left", marginTop: "-1rem" }}
        >
          {alert.password}
        </p>
      )}

      <div className="input-container">
        <input
          type={values.showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirm Password"
          required
          value={values.confirmPassword}
          onChange={changeHandller}
        />
        <span className="show-hide" onClick={showConfirmPasswordHandler}>
          {values.showConfirmPassword ? (
            <i className="ri-eye-off-line"></i>
          ) : (
            <i className="ri-eye-line"></i>
          )}
        </span>
      </div>

      {!values.passwordMatched && (
        <p
          className="verify-error"
          style={{ textAlign: "left", marginTop: "-1rem" }}
        >
          Password did not matched
        </p>
      )}

      {alert && !alert.email && (
        <div className="verify-alert-container">
          <p
            className={`verify-alert ${
              alert.resetSuccess ? "verify-success" : "verify-error"
            }`}
          >
            {alert.resetSuccess || alert.error}
          </p>
        </div>
      )}

      <button type="submit" onClick={submitHandller} disabled={isLoading}>
        {isLoading ? "Reseting" : "Reset"}
      </button>
    </div>
  );
};

export default ResetPaasword;
