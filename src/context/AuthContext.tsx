"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useMemo, useReducer } from "react";
import reducer from "./reducer";
import signupSchema from "../../schemas/signupSchema";
import { z } from "zod";
import {
  CLEAR_ALERT,
  RESEND_BEGIN,
  RESEND_FAILED,
  RESEND_SUCCESS,
  RESEND_TIMER,
  RESET_PASSWORD_EMAIL_BEGIN,
  RESET_PASSWORD_EMAIL_FAILED,
  RESET_PASSWORD_EMAIL_SUCCESS,
  RESET_PASSWORD_BEGIN,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_SUCCESS,
  SIGNIN_BEGIN,
  SIGNIN_FAILED,
  SIGNIN_SUCCESS,
  SIGNUP_BEGIN,
  SIGNUP_FAILED,
  SIGNUP_SUCCESS,
  VERIFICATION_BEGIN,
  VERIFICATION_FAILED,
  VERIFICATION_SUCCESS,
} from "./action";
import signinSchema from "../../schemas/signinSchema";
import { verificationCodeSchema } from "../../schemas/verificationCodeSchema";
import emailSchema from "../../schemas/emailSchema";
import passwordSchema from "../../schemas/passwordSchema";

interface IinitialState {
  isLoading: boolean;
  user: null | object;
  token: null | string;
  alert: any;
  resendTime: number;
  resendLoading: boolean;
}
const initailState: IinitialState = {
  isLoading: false,
  user: null,
  token: null,
  alert: null,
  resendTime: 0,
  resendLoading: false,
};

const AuthContext = createContext<any>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initailState);
  // clear alert
  const clearAlert = () => {
    let timeOut: NodeJS.Timeout;
    return () => {
      clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        dispatch({ type: CLEAR_ALERT });
      }, 3000);
    };
  };

  const clearAlertDebounce = useMemo(() => clearAlert(), []);

  // signup
  const authSignup = async (values: z.infer<typeof signupSchema>) => {
    dispatch({ type: SIGNUP_BEGIN });
    try {
      // validating input fields
      const validateData = signupSchema.safeParse(values);
      if (!validateData.success) {
        const err = validateData.error.issues.reduce((acc, curr) => {
          const { path, message } = curr;
          return { ...acc, [path[0]]: message };
        }, {});
        dispatch({ type: SIGNUP_FAILED, payload: { error: err } });
      } else {
        // sending data to server
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/v1/auth/signup`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(validateData.data),
          }
        );
        const responseData = await response.json();
        // checking if request accepted by server
        if (response.ok) {
          const { message, user } = responseData;
          dispatch({ type: SIGNUP_SUCCESS, payload: { message, user } });
        } else {
          dispatch({
            type: SIGNUP_FAILED,
            payload: { error: responseData },
          });
        }
      }
    } catch (error: any) {
      dispatch({
        type: SIGNUP_FAILED,
        payload: { error: error.message },
      });
    }
    // clear alert
    clearAlertDebounce();
  };

  // verify
  const authVerify = async (values: z.infer<typeof verificationCodeSchema>) => {
    dispatch({ type: VERIFICATION_BEGIN });
    try {
      // validate input fields
      const validateData = verificationCodeSchema.safeParse(values);
      if (!validateData.success) {
        const err = validateData.error.issues.reduce((acc, curr) => {
          const { path, message } = curr;
          return { ...acc, [path[0]]: message };
        }, {});
        dispatch({ type: VERIFICATION_FAILED, payload: { error: err } });
        // making an user request to server
      } else {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/v1/auth/verify`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(validateData.data),
          }
        );
        const responseData = await response.json();

        // checking if request accepted by server
        if (response.ok) {
          const { message, user, token } = responseData;
          dispatch({
            type: VERIFICATION_SUCCESS,
            payload: { message, user, token },
          });
        } else {
          dispatch({
            type: VERIFICATION_FAILED,
            payload: { error: responseData },
          });
        }
      }
    } catch (error: any) {
      dispatch({
        type: VERIFICATION_FAILED,
        payload: { error: error.message },
      });
    }
    // clearing alert
    clearAlertDebounce();
  };

  // resend verification email
  const authResend = async (values: object) => {
    dispatch({ type: RESEND_BEGIN });
    try {
      // sending data to server
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/v1/auth/resend`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      const responseData = await response.json();

      // checking if request accepted by server
      if (response.ok) {
        const { message, seconds } = responseData;
        dispatch({
          type: RESEND_SUCCESS,
          payload: { message, seconds },
        });
      } else {
        const { message, seconds } = responseData;
        dispatch({
          type: RESEND_FAILED,
          payload: { error: message, seconds },
        });
      }
    } catch (error: any) {
      dispatch({
        type: RESEND_FAILED,
        payload: { error: error.message },
      });
    }
    // clearing alert
    clearAlertDebounce();
  };

  // resend timer
  const resendTimer = (time: number) => {
    dispatch({ type: RESEND_TIMER, payload: { seconds: time } });
  };

  // signin
  const authSignin = async (values: z.infer<typeof signinSchema>) => {
    dispatch({ type: SIGNIN_BEGIN });
    try {
      // validating input fields
      const validateData = signinSchema.safeParse(values);
      if (!validateData.success) {
        const err = validateData.error.issues.reduce((acc, curr) => {
          const { path, message } = curr;
          return { ...acc, [path[0]]: message };
        }, {});
        dispatch({ type: SIGNIN_FAILED, payload: { error: err } });
      } else {
        // sending data to server
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/v1/auth/signin`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(validateData.data),
          }
        );
        const responseData = await response.json();
        // checking if request accepted by server
        if (response.ok) {
          const { message, user } = responseData;
          dispatch({
            type: SIGNIN_SUCCESS,
            payload: { user, message },
          });
        } else {
          dispatch({
            type: SIGNIN_FAILED,
            payload: { error: responseData },
          });
        }
      }
    } catch (error: any) {
      dispatch({
        type: SIGNIN_FAILED,
        payload: { error: error.message },
      });
    }
    // clear alert
    clearAlertDebounce();
  };

  // sending reset password email
  const resetingPasswordEmail = async (email: z.infer<typeof emailSchema>) => {
    dispatch({ type: RESET_PASSWORD_EMAIL_BEGIN });
    try {
      // validating input fields
      const validateFields = emailSchema.safeParse(email);
      if (!validateFields.success) {
        console.log(validateFields.error.issues);
        const err = validateFields.error.issues.reduce(
          (acc: any, curr: any) => {
            const { validation, message } = curr;
            return { ...acc, [validation]: message };
          },
          {}
        );
        dispatch({
          type: RESET_PASSWORD_EMAIL_FAILED,
          payload: { error: err },
        });
      } else {
        // sending data to server
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/v1/auth/reset/email`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: validateFields.data }),
          }
        );

        // checking if request accepted by server
        const responseData = await response.json();
        if (response.ok) {
          const { message, user } = responseData;
          dispatch({
            type: RESET_PASSWORD_EMAIL_SUCCESS,
            payload: { message, user },
          });
        } else {
          dispatch({
            type: RESET_PASSWORD_EMAIL_FAILED,
            payload: { error: responseData },
          });
        }
      }
    } catch (error: any) {
      dispatch({
        type: RESET_PASSWORD_EMAIL_FAILED,
        payload: { error: error.message },
      });
    }
    clearAlertDebounce();
  };

  // reseting password
  const resetingPassword = async (
    password: string,
    userId: string,
    code: string
  ) => {
    dispatch({ type: RESET_PASSWORD_BEGIN });
    try {
      // validating input fields
      const validateFields = passwordSchema.safeParse(password);
      if (!validateFields.success) {
        const err = validateFields.error.issues.reduce(
          (acc: any, curr: any) => {
            const { message } = curr;
            return { ...acc, password: message };
          },
          {}
        );
        dispatch({
          type: RESET_PASSWORD_FAILED,
          payload: { error: err },
        });
      } else {
        // sending data to server
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/v1/auth/reset/resetpassword`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              password: validateFields.data,
              userId,
              code,
            }),
          }
        );

        // checking if request accepted by server
        const responseData = await response.json();
        if (response.ok) {
          const { message, user } = responseData;
          dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: { message, user },
          });
        } else {
          dispatch({
            type: RESET_PASSWORD_FAILED,
            payload: { error: responseData },
          });
        }
      }
    } catch (error: any) {
      dispatch({
        type: RESET_PASSWORD_FAILED,
        payload: { error: error.message },
      });
    }
    clearAlertDebounce();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        authSignup,
        authSignin,
        authVerify,
        authResend,
        resendTimer,
        resetingPasswordEmail,
        resetingPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  return useContext(AuthContext);
};

export { useAuthContext, AuthProvider };
