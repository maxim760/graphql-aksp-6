import { useMutation, useQuery } from '@apollo/client'
import { Autocomplete, Box, Button, Grid, Paper } from '@mui/material'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { GET_LIBRARY, ILibraryData } from '../../api/query/getLibrary'
import { Loader } from '../../components/Loader'
import { MainTemplate } from '../../components/template/MainTemplate'
import { PageUrls } from '../../utils/routes'
import {Link as RouterLink} from "react-router-dom"
import { getAuthorFullname, showToast } from '../../utils/functions'
import { blue } from '@mui/material/colors'
import { GET_BOOKS, IBookItem, IBooksData } from '../../api/query/getBooks'
import { ADD_BOOK_TO_LIBRARY, IAddToLibData, IAddToLibVariable } from '../../api/mutation/addBookToLibrary'
import { useForm } from '../../utils/hooks'
import { FormDialog } from '../../components/FormDialog'
import { Input } from '../../components/Input'
import { GET_BOOK } from '../../api/query/getBook'

type IBookForm = {
  book: IBookItem | null
}

const defaultFormData: IBookForm = {
  book: null
}


export const LibraryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { data, loading, error } = useQuery<ILibraryData>(GET_LIBRARY, { variables: { libraryId: id } }) 
  const { data: booksData } = useQuery<IBooksData>(GET_BOOKS) 
  const [addBook, mutationData] = useMutation<IAddToLibData, IAddToLibVariable>(
    ADD_BOOK_TO_LIBRARY,
    {refetchQueries: [
      { query: GET_LIBRARY, variables: { libraryId: id } },
    ]}
  )
  const {formData, setFormData} = useForm<IBookForm>(defaultFormData)
  const [open, setOpen] = useState(false)
  const onClickOpen = () => setOpen(true)
  const onClose = () => {
    mutationData.reset()
    setFormData(defaultFormData)
    setOpen(false)
  }
  const onSubmit = async () => {
    if (!formData.book) {
      showToast("Заполните все поля", "error")
      return
    }
    try {
      const result = await addBook({ variables: { libraryId: id || "", bookId: formData.book?._id || "" } })
      if (result.errors) {
        showToast("Ошибка", "error")
        return
      }
      if (result.data) {
        onClose()
        showToast("Успешно", "success")
      }
    } catch {
      showToast("Ошибка", "error")
    }
  }
  if (loading) {
    return <MainTemplate title="Загрузка"><Loader /></MainTemplate>
  }
  if (error) {
    return <MainTemplate title="Ошибка">{`Ошибка :(`}</MainTemplate>
  }
  if (!data?.library) {
    return <MainTemplate title="Не найдено">Библиотека по указаному id не найдена</MainTemplate>
  }
  return (
    <MainTemplate title={`Название библиотеки`}>
      {booksData?.books && <Button onClick={onClickOpen}>Добавить книгу</Button>}
      <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", width: "100%", m:2}}>

        <Box sx={{mb:2, fontSize: "26px"}}>{data.library.name}</Box>
        <Box sx={{maxWidth: "400px", mb: 1}}>{data.library.address}</Box>
        <Grid container spacing={{xs: 1, md: 2}}>
          {data.library.books.map((book) => (
            <Grid item xs={12} md={6} lg={4} key={book._id}>
              <Box sx={{height: "100%", width: "100%", display: "flex"}} >
                <Paper sx={{width: "100%", display: "flex", flexDirection: "column", p:2, textDecoration: "none"}}>
                  <Box component={RouterLink} to={PageUrls.book(book._id)} sx={{color: blue[300], fontSize: "22px", mb: 1}}>{book.name}</Box>
                  <Box component={RouterLink} to={PageUrls.author(book.author._id)} sx={{color: blue[300],  marginTop: "auto" }}>{getAuthorFullname(book.author)}</Box>
                </Paper>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <FormDialog open={open} onClose={onClose} onSubmit={onSubmit} loading={mutationData.loading} title='Добавление книги'>
        <Autocomplete  
          options={booksData?.books || [] as IBookItem[]}
          getOptionLabel={(option: IBookItem) => `${option.name} - ${getAuthorFullname(option.author)}`}
          value={formData.book}
          onChange={(e, newValue) => setFormData(prev => ({...prev, book: newValue ? newValue : null}))}
          renderInput={(params) => <Input
            {...params}
            label="Книга"
          />}
        />
      </FormDialog>
    </MainTemplate>
  )
}