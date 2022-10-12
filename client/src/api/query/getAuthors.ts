import { gql } from "@apollo/client";

export type IAuthor = {
  _id: string,
  firstName: string,
  lastName: string,
  patronymic?: string,
  bornIn: number,
  diedIn: number,
  books: {
    _id: string,
    name: string,
    description: string,
    pages: number,
    img: string
  }[]
}

export type IAuthorsData = {
  authors: IAuthor[]
}

export const GET_AUTHORS = gql`
  query Authors {
    authors {
      _id
      firstName
      lastName
      patronymic
      bornIn
      diedIn
      img
      books {
        _id
        name,
        description,
        pages,
        img
      }
    }
  }
`