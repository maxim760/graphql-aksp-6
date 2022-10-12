import { Schema, model } from "mongoose";

const BookSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  pages: {
    type: Number,
  },
  img: {
    type: String,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "Author"
  },
  libraries: [{
    type: Schema.Types.ObjectId,
    ref: "Library",
    default: [],
  }]
}, {timestamps: true});

export const BookModel = model("Book", BookSchema)