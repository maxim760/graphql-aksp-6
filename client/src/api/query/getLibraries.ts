import { gql } from "@apollo/client";

export type ILibraryItem = {
  _id: string,
  address: string,
  name: string,
  books: {
    _id: string
  }[]
}

export type ILibrariesData = {
  libraries: ILibraryItem[]
}

export const GET_LIBRARIES = gql`
  query Libraries {
    libraries {
      _id
      address
      name
      books {
        _id
      }
    }
  }
`