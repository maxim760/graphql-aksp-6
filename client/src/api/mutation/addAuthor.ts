import { gql } from "@apollo/client";

export type IAddAuthorData = {
  addAuthor: {
    _id: string,
    firstName: string,
    lastName: string,
    patronymic: string,
    bornIn: number
    diedIn: number
    img: string
  }
}

export type IAddAuthorVariables = {
  author: {
    "firstName": string,
    "lastName": string,
    "patronymic": string,
    "bornIn": number,
    "diedIn"?: number,
    "img": string
  }
}

export const ADD_AUTHOR = gql`
  mutation AddAuthor($author: AuthorContent) {
    addAuthor(author: $author) {
      _id
      firstName
      lastName
      patronymic
      bornIn
      diedIn
      img
    }
  }
`