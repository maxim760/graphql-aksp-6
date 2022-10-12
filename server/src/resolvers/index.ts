import { AuthorModel, BookModel, LibraryModel } from "../models"
import {IExecutableSchemaDefinition} from "@graphql-tools/schema"
export const resolvers: IExecutableSchemaDefinition["resolvers"] = {
  Query: {
    async authors() {
      const res = await AuthorModel.find()
      return res
    },
    async author(_, { id }) {
      return await AuthorModel.findById(id)
    },
    async searchAuthors(_, { query }) {
      return await BookModel
        .find({
          $expr: {
            $project: {
              totalName: {$concat: ["$firstName", " ", "$patronymic", " ", "$lastName"]}
            }
          },
          totalName: {$regex: query, $options: "i"}
        })
    },
    async books() {
      const res = await BookModel.find()
      // console.log(res)
      return res
    },
    async book(_, {id}) {
      return await BookModel.findById(id)
    },
    async searchBooks(_, { query }) {
      return await BookModel
        .find({
          $or: [
            {name: {$regex: query, $options: "i"}},
            {description: {$regex: query, $options: "i"}},
          ]
        })
    },
    async libraries() {
      // return await LibraryModel.find().populate("books")
      return await LibraryModel.find()
    },
    async library(_, {id}) {
      return await LibraryModel.findById(id)
    },
    async searchLibraries(_, {query}) {
      return await LibraryModel
        .find({
          name: {$regex: query, $options: "i"}
        })
    }
  },
  Book: {
    async author(root) {
      return await AuthorModel.findById(root.author)
    },
    async libraries(root) {
      console.log({root})
      return await LibraryModel.find({_id: { $in: root.libraries}})
    }
  },
  Author: {
    async books(root) {
      return await BookModel.find({author: root._id})
    }
  },
  Library: {
    async books(root) {
      return await BookModel.find({ _id: { $in: root.books }})
    }
  },
  Mutation: {
    async addAuthor(_, { author }) {
      try {
        const newAuthor = await AuthorModel.create(author)
        return newAuthor
      } catch(e) {
        throw new Error((e as Error).message)
      }
    },
    async updateAuthor(_, { author }) {
      try {
        return await AuthorModel.findByIdAndUpdate(author._id, author, {new: true})
      } catch(e) {
        throw new Error((e as Error).message)
      }
    },
    async addBook(_, { book }) {
      try {
        const {authorId: author, ...data} = book
        const newBook = await BookModel.create({...data, author})
        return newBook
      } catch(e) {
        throw new Error((e as Error).message)
      }
    },
    async updateBook(_, { book }) {
      try {
        const {authorId: author, ...data} = book
        return await BookModel.findByIdAndUpdate(book._id, {...data, author}, {new: true})
      } catch(e) {
        throw new Error((e as Error).message)
      }
    },
    async addLibrary(_, { library }) {
      try {
        const newLibrary = await LibraryModel.create(library)
        return newLibrary
      } catch(e) {
        throw new Error((e as Error).message)
      }
    },
    async updateLibrary(_, { library }) {
      try {
        return await LibraryModel.findByIdAndUpdate(library._id, library, {new: true})
      } catch(e) {
        throw new Error((e as Error).message)
      }
    },
    async addBookToLibrary(_, { libraryId, bookId }) {
      try {
        const library = await LibraryModel.findById(libraryId)
        const book = await BookModel.findById(bookId)
        if (!library || !book) {
          throw new Error("Не найдено")
        }
        book.libraries.push(libraryId)
        library.books.push(bookId)
        library.save()
        book.save()
        return library
      } catch (e) {
        throw new Error((e as Error).message)
      }
    }

  }
}