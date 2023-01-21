import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserTypes } from 'src/common/enums';

@Schema({ collection: 'users', timestamps: true })
export class UserSchema {
  // making username unique as email or any other unique field is not being captured
  @Prop({ type: String, required: true, unique: true })
  userName: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true, enum: UserTypes })
  userType: string;
}

export const userSchema = SchemaFactory.createForClass(UserSchema);
