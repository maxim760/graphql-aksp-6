import { gql } from "@apollo/client";

export type IBook = {
  book: {
    _id: string,
    name: string,
    description: string,
    pages: string,
    img: string,
    author: {
      _id: string,
      firstName: string,
      lastName: string,
      patronymic: string,
    },
    libraries: {
      _id: string,
      name: string
    }[]
  }
}

export const GET_BOOK = gql`
  query Book($bookId: ID!) {
    book(id: $bookId) {
      _id
      name
      description
      pages
      img
      author {
        _id
        firstName
        lastName
        patronymic
      }
      libraries {
        _id
        name
      }
    }
}
`