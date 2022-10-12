import { useMutation, useQuery } from '@apollo/client'
import { Grid, Paper, Button, Box } from '@mui/material'
import React, { useState } from 'react'
import { Link as RouterLink, useParams } from 'react-router-dom'
import { ADD_BOOK, IAddBookData, IAddBookVariable } from '../../api/mutation/addBook'
import { GET_AUTHOR, IAuthorData } from '../../api/query/getAuthor'
import { GET_BOOKS } from '../../api/query/getBooks'
import { FormDialog } from '../../components/FormDialog'
import { Input } from '../../components/Input'
import { Loader } from '../../components/Loader'
import { MainTemplate } from '../../components/template/MainTemplate'
import { getAuthorFullname, showToast } from '../../utils/functions'
import { useForm } from '../../utils/hooks'
import { PageUrls } from '../../utils/routes'

type IBookForm = {
  name: string,
  description: string,
  pages: number,
  img: string,
}

const defaultFormData: IBookForm = {
  name: "",
  description: "",
  pages: 0,
  img: ""
}

export const AuthorPage: React.FC = () => {
  const { id } = useParams<{id: string}>()
  const { data, loading, error } = useQuery<IAuthorData>(GET_AUTHOR, { variables: { authorId: id } })
  const [addBook, mutationData] = useMutation<IAddBookData, IAddBookVariable>(
    ADD_BOOK,
    {refetchQueries: [
      { query: GET_AUTHOR, variables: { authorId: id } },
      { query: GET_BOOKS, variables: { authorId: id } }
    ]}
  )
  const {formData, onChange, onChangeNumber, setFormData} = useForm<IBookForm>(defaultFormData)
  const [open, setOpen] = useState(false)
  const onClickOpen = () => setOpen(true)
  const onClose = () => {
    mutationData.reset()
    setFormData(defaultFormData)
    setOpen(false)
  }
  const onSubmit = async () => {
    try {
      const result = await addBook({ variables: { book: { ...formData, authorId: id || "" } } })
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
  const fullName = data?.author ? getAuthorFullname(data.author) : ""
  if (loading) {
    return <MainTemplate title="Загрузка"><Loader /></MainTemplate>
  }
  if (error) {
    return <MainTemplate title="Ошибка">{`Ошибка :(`}</MainTemplate>
  }
  if (!data?.author) {
    return <MainTemplate title="Не найдено">Автор по указаному id не найден</MainTemplate>
  }
  return (
    <MainTemplate title={fullName} >
      <Button onClick={onClickOpen}>Добавить книгу</Button>
      <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", width: "100%", p: 2}}>

      <Box>{data.author.firstName}</Box>
      <Box>{data.author.patronymic}</Box>
      <Box>{data.author.lastName}</Box>
      <img src={data.author.img} width={200} />
      <Box sx={{m: 2, width: "100%"}}>
        <Grid container spacing={{xs: 1, md: 2}}>
          {data.author.books.map((book) => (
            <Grid item xs={12} md={6} lg={4} key={book._id}>
              <Box component={RouterLink} sx={{height: "100%", display: "flex"}} to={PageUrls.book(book._id)}>
                <Paper sx={{width: "100%", display: "flex", flexDirection: "column", p:2, textDecoration: "none"}}>
                  <Box sx={{alignSelf: "center"}}><img src={book.img} height={140} /></Box>
                  <Box sx={{alignSelf: "center", fontSize: "22px", mb: 1}}>{book.name}</Box>
                  <Box sx={{mb: 2, fontSize: "15px", lineHeight: 1.2}}>{book.description}</Box>
                  <Box sx={{marginTop: "auto"}}>Кол-во страниц - {book.pages}</Box>
                </Paper>
              </Box>
            </Grid>
          ))}
        </Grid>
        </Box>
      </Box>
      <FormDialog open={open} onClose={onClose} onSubmit={onSubmit} loading={mutationData.loading} title='Создание книги'>
        <Input name="name" label="Название" required onChange={onChange} value={formData.name} />
        <Input name="description" label="Описание" multiline rows={4} required onChange={onChange} value={formData.description} />
        <Input name="pages" label="Кол-во страниц" required onChange={onChangeNumber} value={formData.pages} />
        <Input name="img" label="Ссылка на фото" required onChange={onChange} value={formData.img} />
      </FormDialog>
    </MainTemplate>
  )
}