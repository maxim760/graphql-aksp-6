import {Schema, model} from "mongoose"

const AuthorSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  patronymic: {
    type: String,
    trim: true,
  },
  bornIn: {
    type: Number
  },
  diedIn: {
    type: Number
  },
  img: {
    type: String
  },
  books: [{
    type: Schema.Types.ObjectId,
    ref: "Book",
    default: [],
  }]
}, { timestamps: true })


export const AuthorModel = model("Author", AuthorSchema)