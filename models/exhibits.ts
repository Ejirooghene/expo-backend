import { Document, Schema, model } from "mongoose";

export interface IExhibit extends Document {
    seller: string,
    desc: string,
    imageUrl: string;
    price: number;
    likes: number;
    category: string
}

const schema = {
    seller: String,
    desc: String,
    imageUrl: String,
    price: Number,
    category: String
}

const exhibitSchema: Schema<IExhibit> = new Schema(schema);

export const Exhibit = model<IExhibit>("exhibits", exhibitSchema);