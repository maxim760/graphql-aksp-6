import { AuthorPage } from "../pages/Author/AuthorPage"
import { AuthorsPage } from "../pages/Authors/AuthorsPage"
import { BookPage } from "../pages/Book/BookPage"
import { BooksPage } from "../pages/Books/BooksPage"
import { LibrariesPage } from "../pages/Libraries/LibrariesPage"
import { LibraryPage } from "../pages/Library/LibraryPage"

export const PageUrls = {
  libraries: () => "/libraries",
  library: (id: string) => `/libraries/${id}`,
  authors: () => "/authors",
  author: (id: string) => `/authors/${id}`,
  books: () => "/books",
  book: (id: string) => `/books/${id}`,
}

export const listRoutes = [
  {element: <LibrariesPage />, path: PageUrls.libraries(), name: "Библиотеки"},
  {element: <AuthorsPage />, path: PageUrls.authors(), name: "Авторы"},
  {element: <BooksPage />, path: PageUrls.books(), name: "Книги"},
]

const itemRoutes = [
  {element: <LibraryPage />, path: PageUrls.library(":id"), name: "Библиотека"},
  {element: <AuthorPage />, path: PageUrls.author(":id"), name: "Автор"},
  {element: <BookPage />, path: PageUrls.book(":id"), name: "Книга"},
]

export const routes = [
  ...listRoutes,
  ...itemRoutes
]