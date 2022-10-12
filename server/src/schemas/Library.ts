import { gql } from "apollo-server";

export const LibrarySchema = gql`
  type Library {
    _id: ID!
    name: String!
    address: String!
    books: [Book!]
  }
  extend type Query {
    libraries: [Library!]!
    library(id: ID!): Library
    searchLibraries(query: String!): [Library!]!
  }
  extend type Mutation {
    addLibrary(library: LibraryContentAdd):Library
    updateLibrary(library: LibraryContentUpdate):Library
    addBookToLibrary(libraryId: ID!, bookId: ID!):Library
  }
  input LibraryContentAdd {
    name: String!
    address: String!
  }
  input LibraryContentUpdate {
    _id: ID!
    name: String!
    address: String!
  }
`;