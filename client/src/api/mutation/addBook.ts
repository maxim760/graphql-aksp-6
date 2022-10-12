import { gql } from "@apollo/client";

export type IAddBookData = {
  addBook: {
    _id: string
  }
}

export type IAddBookVariable = {
  book: {
    name: string,
    description: string,
    pages: number,
    img: string,
    authorId: string
  }
}
  

export const ADD_BOOK = gql`
  mutation AddBook($book: BookContentAdd) {
    addBook(book: $book) {
      _id
    }
  }
`