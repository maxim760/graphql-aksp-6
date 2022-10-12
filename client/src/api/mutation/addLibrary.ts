import { gql } from "@apollo/client";

export type IAddLibraryData = {
  addLibrary: {
    _id: string
  }
}

export type IAddLibraryVariable = {
  library: {
    name: string,
    address: string
  }
}

export const ADD_LIBRARY = gql`
  mutation Mutation($library: LibraryContentAdd) {
    addLibrary(library: $library) {
      _id,
    }
  }
`