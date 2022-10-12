import { gql } from "@apollo/client";

export type ILibraryData = {
  library: {
    _id: string,
    name: string,
    address: string,
    books: {
      _id: string,
      name: string,
      author: {
        _id: string,
        firstName: string,
        lastName: string,
        patronymic: string
      }
    }[]
  }
}

export const GET_LIBRARY = gql`
  query Library($libraryId: ID!) {
    library(id: $libraryId) {
      _id
      name
      books {
        _id
        name
        author {
          _id
          firstName
          lastName
          patronymic
        }
      }
      address
    }
  }
`