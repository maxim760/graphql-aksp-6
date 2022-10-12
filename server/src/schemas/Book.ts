import { gql } from "apollo-server";

export const BookSchema = gql`
  type Book {
    _id: ID!
    name: String!
    description: String
    pages: Int
    img: String
    author: Author
    libraries: [Library!]
  }
  extend type Query {
    books: [Book!]!
    searchBooks(query: String!): [Book!],
    book(id: ID!): Book,
  }
  extend type Mutation {
    addBook(book: BookContentAdd): Book
    updateBook(book: BookContentUpdate): Book
  }
  input BookContentAdd {
    name: String!
    description: String
    pages: Int
    img: String
    authorId: ID!
  }
  input BookContentUpdate {
    _id: ID!
    name: String!
    description: String
    pages: Int
    img: String
    authorId: ID!
  }
`;