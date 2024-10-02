import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { Schema } from "@nestjs/mongoose";
import { SchemaTypes, Types, version } from "mongoose";
import { Role } from "src/auth/decorator/role.enum";

@Schema({versionKey: false})
export class User {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;
  @Prop({ unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, default: true })
  status: boolean;

  @Prop({ type: [String], enum: Role, default: [Role.USER] })
  role: Role[];
  
}
export const UserSchema = SchemaFactory.createForClass(User);