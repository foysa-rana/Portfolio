"use client";
import { useAuthContext } from "@/context/AuthContext";
import authLogo from "../../../../public/auth_logo.svg";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const { authSignin, alert, isLoading, user } = useAuthContext();
  const changeHandller = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const showPasswordHandler = () => {
    setShowPassword((prev) => !prev);
  };
  const submitHandller = (e: React.MouseEvent) => {
    e.preventDefault();
    authSignin(values);
  };
  useEffect(() => {
    let timoutId: NodeJS.Timeout;
    if (alert && alert.success) {
      setValues({ ...values, email: "", password: "" });
      timoutId = setTimeout(() => {
        router.replace("/admin");
      }, 3000);
    }
    if (alert && alert.unverifiedUser) {
      setValues({ ...values, email: "", password: "" });
      timoutId = setTimeout(() => {
        router.replace(`/auth/verify?user=${user.userId}`);
      }, 3000);
    }
    return () => clearTimeout(timoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alert]);
  return (
    // <!-- partial:index.partial.html -->
    <div className="screen-1">
      <Image className="logo" src={authLogo} alt="Male avatar logo" priority />
      <div className="wrapper">
        <div className="email form-control">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={changeHandller}
            value={values.email}
          />
        </div>
        {alert && <p className="warning">{alert.email}</p>}
      </div>
      <div className="wrapper">
        <div className="password form-control">
          <input
            className="pas"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            onChange={changeHandller}
            value={values.password}
          />
          <span className="show-hide" onClick={showPasswordHandler}>
            {showPassword ? (
              <i className="ri-eye-off-line"></i>
            ) : (
              <i className="ri-eye-line"></i>
            )}
          </span>
        </div>
        {alert && <p className="warning">{alert.password}</p>}
        {alert && (
          <div className="alert-container">
            <p className={`alert ${alert.success ? "success" : "error"}`}>
              {alert.success || alert.error || alert.unverifiedUser}
            </p>
          </div>
        )}
      </div>

      <button className="login" onClick={submitHandller} disabled={isLoading}>
        {isLoading ? "Processing" : "Signin"}
      </button>
      <div className="footer">
        <span>
          Forgot Password?&nbsp;
          <Link className="link" href="/auth/reset/email">
            Reset Here
          </Link>
        </span>
        <span>
          Don't have an account?&nbsp;
          <Link className="link" href="/auth/signup">
            Signup
          </Link>
        </span>
      </div>
    </div>
    // <!-- partial -->
  );
};

export default Signin;
