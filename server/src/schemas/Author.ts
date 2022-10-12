import { gql } from "apollo-server";

export const AuthorSchema = gql`
  type Author {
    _id: ID!
    firstName: String!
    lastName: String!
    patronymic: String
    bornIn: Int!
    diedIn: Int
    img: String
    books: [Book!]!
  }
  type Query {
    author(id: ID!): Author
    searchAuthors(query: String!): [Author!]!
    authors: [Author!]!
  }
  type Mutation {
    addAuthor(author: AuthorContent): Author,
    updateAuthor(author: AuthorFull): Author
  }
  input AuthorContent {
    firstName: String!
    lastName: String!
    patronymic: String
    bornIn: Int!
    diedIn: Int
    img: String
  }
  input AuthorFull {
    _id: ID!
    firstName: String!
    lastName: String!
    patronymic: String
    bornIn: Int!
    diedIn: Int
    img: String
  }
`;