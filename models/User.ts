import { Document, Schema, model } from "mongoose";
 
export interface IUser {
    username: string;
    email: string;
    password: string;
    preferences: string[],
    cart: string[];
    favorite: string[];
    purchase: string[];
}

const userSchema: Schema<IUser> = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    preferences: [{ type: String }],
    cart: [{type: Schema.Types.ObjectId, ref: "exhibits"}],
    favorite: [{type: Schema.Types.ObjectId, ref: "exhibits"}],
    purchase: [{type: Schema.Types.ObjectId, ref: "exhibits"}]
})


export const User = model<IUser>("user", userSchema);   