import { gql } from "@apollo/client";

export type IAddToLibData = {
  addBookToLibrary: {
    _id: string
  }
}

export type IAddToLibVariable = {
  libraryId: string,
  bookId: string,
}

export const ADD_BOOK_TO_LIBRARY = gql`
  mutation AddBookToLibrary($libraryId: ID!, $bookId: ID!) {
    addBookToLibrary(libraryId: $libraryId, bookId: $bookId) {
      _id
    }
  }
`