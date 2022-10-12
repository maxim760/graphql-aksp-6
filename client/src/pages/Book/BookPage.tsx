import { useMutation, useQuery } from '@apollo/client'
import { Autocomplete, Box, Button, Typography } from '@mui/material'
import { blue } from '@mui/material/colors'
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ADD_BOOK_TO_LIBRARY, IAddToLibData, IAddToLibVariable } from '../../api/mutation/addBookToLibrary'
import { GET_BOOK, IBook } from '../../api/query/getBook'
import { GET_LIBRARIES, ILibrariesData, ILibraryItem } from '../../api/query/getLibraries'
import { FormDialog } from '../../components/FormDialog'
import { Input } from '../../components/Input'
import { Loader } from '../../components/Loader'
import { MainTemplate } from '../../components/template/MainTemplate'
import { getAuthorFullname, showToast } from '../../utils/functions'
import { useForm } from '../../utils/hooks'
import { PageUrls } from '../../utils/routes'

type ILibraryForm = {
  library: ILibraryItem | null
}

const defaultFormData: ILibraryForm = {
  library: null
}

export const BookPage: React.FC = ({ }) => {
  const { id } = useParams<{ id: string }>()
  const { data, loading, error } = useQuery<IBook>(GET_BOOK, { variables: { bookId: id } }) 
  const [addBook, mutationData] = useMutation<IAddToLibData, IAddToLibVariable>(
    ADD_BOOK_TO_LIBRARY,
    {refetchQueries: [
      { query: GET_BOOK, variables: { bookId: id } },
      { query: GET_LIBRARIES}
    ]}
  )
  console.log({data})
  const { data: librariesData } = useQuery<ILibrariesData>(GET_LIBRARIES)
  const {formData, setFormData} = useForm<ILibraryForm>(defaultFormData)
  const [open, setOpen] = useState(false)
  const onClickOpen = () => setOpen(true)
  const onClose = () => {
    mutationData.reset()
    setFormData(defaultFormData)
    setOpen(false)
  }
  const onSubmit = async () => {
    if (!formData.library) {
      showToast("Заполните все поля", "error")
      return
    }
    try {
      const result = await addBook({ variables: { bookId: id || "", libraryId: formData.library?._id || "" } })
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
  if (!data?.book) {
    return <MainTemplate title="Не найдено">Книга по указаному id не найдена</MainTemplate>
  }
  return (
    <MainTemplate title={data.book.name}>
      {librariesData?.libraries && <Button onClick={onClickOpen}>Добавить в библиотеку</Button>}
      <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", width: "100%"}}>
      <Box sx={{mb:2, fontSize: "26px"}}>{data.book.name}</Box>
      <Box sx={{maxWidth: "400px", mb: 1}}>{data.book.description}</Box>
      <Box sx={{fontSize: "20px"}}>Кол-во страниц - {data.book.pages}</Box>
      <img src={data.book.img} width={200} />
        <Link to={PageUrls.author(data.book.author._id)}><Typography sx={{ textDecoration: "underline", color: blue[200], mt: 2, mb:3 }}>Автор - {getAuthorFullname(data.book.author)}</Typography></Link>
        <Box>Можно найти в этих библоиотеках:</Box>
      {data.book.libraries.map((lib) => (
        <Link to={PageUrls.library(lib._id)}><Box sx={{textDecoration: "underline", color: blue[300]}} key={lib._id}>{lib.name}</Box></Link>
      ))}
      <FormDialog open={open} onClose={onClose} onSubmit={onSubmit} loading={mutationData.loading} title='Добавление книги'>
        <Autocomplete  
          options={librariesData?.libraries || [] as ILibraryItem[]}
          getOptionLabel={(option: ILibraryItem) => `${option.name} - ${option.address}`}
          value={formData.library}
          onChange={(e, newValue) => setFormData(prev => ({...prev, library: newValue ? newValue : null}))}
          renderInput={(params) => <Input
            {...params}
            label="Библиотека"
          />}
        />
      </FormDialog>
      </Box>
    </MainTemplate>
  )
}