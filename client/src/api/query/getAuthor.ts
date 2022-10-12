import { gql } from "@apollo/client";

export type IAuthorData = {
  author: {
    _id: string,
    firstName: string,
    lastName: string,
    patronymic: string,
    bornIn: string,
    diedIn: number,
    img: string,
    books: {
      _id: string,
      name: string,
      description: string,
      pages: number,
      img: string
    }[]
  }
} 

export const GET_AUTHOR = gql`
  query Author($authorId: ID!) {
    author(id: $authorId) {
      _id
      firstName
      lastName
      bornIn
      patronymic
      diedIn
      img
      books {
        _id
        name
        description
        pages
        img
      }
    }
}
`