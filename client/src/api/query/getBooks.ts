import { gql } from "@apollo/client";

export type IBookItem = {
  _id: string,
  name: string,
  img: string,
  author: {
    _id: string
    firstName: string
    lastName: string
    patronymic: string
  }
}

export type IBooksData = {
  books: IBookItem[]
}

export const GET_BOOKS = gql`
  query Books {
    books {
      _id
      name
      img,
      author {
        _id,
        firstName,
        lastName,
        patronymic
      }
    }
  }
`