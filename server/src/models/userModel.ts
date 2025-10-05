import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";
import { config } from "../config";
import { UserModel } from "./userInterface";


export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin";
  bio?: string;
  proffession?: string;
  currentPosition?: string;
  experience?: string;
  location?: string;
  avatar?: string;
  description?: string;
  banner?: string;
  social?: {
    freelancer?: string;
    fiverr?: string;
  };
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin"], default: "admin" },
    bio: { type: String },
    proffession: { type: String },
    currentPosition: { type: String },
    experience: { type: String },
    location: { type: String },
    avatar: { type: String },
    banner: { type: String },
    description: { type: String },
    social: {
      freelancer: { type: String },
      fiverr: { type: String },
    },
  },
  { timestamps: true }
);


// UserSchema.pre<IUser>("save", async function (next) {
//   if (!this.isModified("password")) return next();

//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (err) {
//     next(err as Error);
//   }
// });

// Existing ID

UserSchema.statics.isUserExistsByEmail = async function (email: string) {
    return await User.findOne({ email }).select('+password');
};

UserSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this; // doc
    // hashing password and save into DB
    user.password = await bcrypt.hash(
        user.password,
        Number(config.salt),
    );
    next();
});

// set '' after saving password
UserSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});

// Password Matched
UserSchema.statics.isPasswordMatched = async function (
    plainTextPassword,
    hashedPassword,
) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
};

// Chenged password then tokn expired
UserSchema.statics.isJWTIssuedBeforePasswordChanged = function (
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
) {
    const passwordChangedTime =
        new Date(passwordChangedTimestamp).getTime() / 1000;
    return passwordChangedTime > jwtIssuedTimestamp;
};


export const User = model<IUser, UserModel>("User", UserSchema);
