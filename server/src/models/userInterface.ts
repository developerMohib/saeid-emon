/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { IUser } from "./userModel";

export interface UserModel extends Model<IUser> {

  //instance methods for checking if the user exist
  isUserExistsByEmail(email: string): Promise<IUser>;

  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;

  // Password Chenged then token expire
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}