/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CLEAR_ALERT,
  RESEND_BEGIN,
  RESEND_FAILED,
  RESEND_SUCCESS,
  RESEND_TIMER,
  RESET_PASSWORD_BEGIN,
  RESET_PASSWORD_EMAIL_BEGIN,
  RESET_PASSWORD_EMAIL_FAILED,
  RESET_PASSWORD_EMAIL_SUCCESS,
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

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case CLEAR_ALERT:
      return { ...state, alert: null };

    case SIGNUP_BEGIN:
      return { ...state, isLoading: true };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        alert: action.payload.message,
        user: action.payload.user,
        isLoading: false,
      };

    case SIGNUP_FAILED:
      return { ...state, alert: action.payload.error, isLoading: false };

    case VERIFICATION_BEGIN:
      return { ...state, isLoading: true };

    case VERIFICATION_SUCCESS:
      return {
        ...state,
        alert: action.payload.message,
        user: action.payload.user,
        token: action.payload.token,
        isLoading: false,
      };

    case VERIFICATION_FAILED:
      return { ...state, alert: action.payload.error, isLoading: false };

    case RESEND_BEGIN:
      return { ...state, resendLoading: true };

    case RESEND_SUCCESS:
      return {
        ...state,
        alert: action.payload.message,
        resendTime: action.payload.seconds,
        resendLoading: false,
      };

    case RESEND_FAILED:
      return {
        ...state,
        alert: action.payload.error.message,
        resendTime: action.payload.seconds,
        resendLoading: false,
      };

    case RESEND_TIMER:
      return {
        ...state,
        resendTime: action.payload.seconds,
      };

    case SIGNIN_BEGIN:
      return { ...state, isLoading: true };

    case SIGNIN_SUCCESS:
      return {
        ...state,
        alert: action.payload.message,
        user: action.payload.user,
        isLoading: false,
      };

    case SIGNIN_FAILED:
      return { ...state, alert: action.payload.error, isLoading: false };

    case RESET_PASSWORD_EMAIL_BEGIN:
      return { ...state, isLoading: true };

    case RESET_PASSWORD_EMAIL_SUCCESS:
      return {
        ...state,
        alert: action.payload.message,
        user: action.payload.user,
        isLoading: false,
      };

    case RESET_PASSWORD_EMAIL_FAILED:
      return { ...state, alert: action.payload.error, isLoading: false };

    case RESET_PASSWORD_BEGIN:
      return { ...state, isLoading: true };

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        alert: action.payload.message,
        user: action.payload.user,
        isLoading: false,
      };

    case RESET_PASSWORD_FAILED:
      return { ...state, alert: action.payload.error, isLoading: false };

    default:
      console.log("Unknown error occurd");
  }
};

export default reducer;
