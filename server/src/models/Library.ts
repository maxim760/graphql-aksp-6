import {Schema, model} from "mongoose"

const LibrarySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  books: [{
    type: Schema.Types.ObjectId,
    ref: "Book",
    default: []
  }]
}, {timestamps: true})

export const LibraryModel = model("Library", LibrarySchema)