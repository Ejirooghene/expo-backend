"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exhibit = void 0;
const mongoose_1 = require("mongoose");
const schema = {
    seller: String,
    desc: String,
    imageUrl: String,
    price: Number,
    category: String
};
const exhibitSchema = new mongoose_1.Schema(schema);
exports.Exhibit = (0, mongoose_1.model)("exhibits", exhibitSchema);
