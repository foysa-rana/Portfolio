import mongoose, { Schema, model, Document } from "mongoose";

export interface Iuser extends Document {
  name: string;
  email: string;
  password: string;
  verificationCode: string;
  resendVerificationCode: Date;
  verificationCodeExpire: Date;
  isVerified: boolean;
  image: string;
  about: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema<Iuser> = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
      "Please use a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
    match: [
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
      "Password must contain at least  8 characters, 1 uppercase letter, 1 lowercase letter, and 1 number",
    ],
  },
  verificationCode: {
    type: String,
    rquired: true,
  },
  resendVerificationCode: {
    type: Date,
  },
  verificationCodeExpire: {
    type: Date,
    rquired: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
  },
  about: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const userModel =
  (mongoose.models.User as mongoose.Model<Iuser>) ||
  model<Iuser>("User", userSchema);
