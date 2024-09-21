"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import authLogo from "../../../../public/auth_logo.svg";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const { authSignup, alert, isLoading, user } = useAuthContext();
  const changeHandller = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const showPasswordHandler = () => {
    setShowPassword((prev) => !prev);
  };

  const submitHandller = async (e: React.MouseEvent) => {
    e.preventDefault();
    authSignup(values);
  };
  useEffect(() => {
    if (alert && alert.success) {
      setValues({ ...values, name: "", email: "", password: "" });
      setTimeout(() => {
        router.replace(`/auth/verify?user=${user.userId}`);
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alert]);
  return (
    // <!-- partial:index.partial.html -->
    <div className="screen-1">
      <Image className="logo" src={authLogo} alt="Male avatar logo" />
      <div className="wrapper">
        <div className="name form-control">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            onChange={changeHandller}
            value={values.name}
          />
        </div>
        {alert && <p className="warning">{alert.name}</p>}
      </div>
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
            <p className={`alert ${alert.error ? "error" : "success"}`}>
              {alert.success || alert.error}
            </p>
          </div>
        )}
      </div>
      <button className="login" onClick={submitHandller} disabled={isLoading}>
        {isLoading ? "Processing" : "Signup"}
      </button>
      <div className="footer">
        <span>
          Already have an account?&nbsp;
          <Link className="link" href="/auth/signin">
            Signin
          </Link>
        </span>
      </div>
    </div>
    // <!-- partial -->
  );
};

export default Signup;
