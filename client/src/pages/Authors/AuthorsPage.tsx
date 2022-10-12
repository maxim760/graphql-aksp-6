import { useMutation, useQuery } from '@apollo/client'
import { Grid, Paper, Typography, Box, Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ADD_AUTHOR, IAddAuthorData, IAddAuthorVariables } from '../../api/mutation/addAuthor'
import { GET_AUTHORS, IAuthor, IAuthorsData } from '../../api/query/getAuthors'
import { FormDialog } from '../../components/FormDialog'
import { Input } from '../../components/Input'
import { Loader } from '../../components/Loader'
import { MainTemplate } from '../../components/template/MainTemplate'
import { getAuthorFullname, showToast } from '../../utils/functions'
import { useForm } from '../../utils/hooks'
import { PageUrls } from '../../utils/routes'

type IAuthorForm = {
  firstName: string,
  lastName: string,
  patronymic: string,
  bornIn: number | "",
  diedIn?: number,
  img: string
}

const defaultFormData: IAuthorForm = {
  firstName: "",
  lastName: "",
  patronymic: "",
  bornIn: "",
  diedIn: undefined,
  img: ""
}

export const AuthorsPage: React.FC = ({ }) => {
  const { data, loading, error } = useQuery<IAuthorsData>(GET_AUTHORS)

  const [addAuthor, mutationData] = useMutation<IAddAuthorData, IAddAuthorVariables>(
    ADD_AUTHOR,
    { refetchQueries: [{ query: GET_AUTHORS }] }
  )
  const {formData, onChange, onChangeNumber, setFormData} = useForm<IAuthorForm>(defaultFormData)
  const [open, setOpen] = useState(false)
  const onClickOpen = () => setOpen(true)
  const onClose = () => {
    mutationData.reset()
    setFormData(defaultFormData)
    setOpen(false)
  }
  const onSubmit = async () => {
    try {
      const result = await addAuthor({ variables: { author: { ...formData, bornIn: formData.bornIn || 0 } } })
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
  return (
    <MainTemplate title="Все авторы">
      <Button onClick={onClickOpen}>Добавить</Button>
      <Box sx={{m: 2}}>
      <Grid container spacing={{xs: 1, md: 2}}>
        {data && data.authors.map((item) => (
          <Grid key={item._id} item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Link to={PageUrls.author(item._id)}>
              <Paper sx={{display: "flex", flexDirection: "column", p:2}}>
                <Typography variant='h4' sx={{fontSize: "22px"}}>{getAuthorFullname(item)}</Typography>
                <div>Годы жизни</div>
                <div>{item.bornIn} - {item.diedIn || "По наше время"}</div>
                <div>Кол-во книг в системе: {item.books.length}</div>
              </Paper>
            </Link>
          </Grid>
        ))}
      </Grid>
      </Box>
      <FormDialog open={open} onClose={onClose} onSubmit={onSubmit} loading={mutationData.loading} title='Создание автора'>
        <Input name="firstName" label="Имя" required onChange={onChange} value={formData.firstName} />
        <Input name="patronymic" label="Отчество" required onChange={onChange} value={formData.patronymic} />
        <Input name="lastName" label="Фамилия" required onChange={onChange} value={formData.lastName} />
        <Input name="bornIn" type="number" required label="Родился" onChange={onChangeNumber} value={formData.bornIn}  />
        <Input name="diedIn" type="number" label="Умер" onChange={onChangeNumber} value={formData.diedIn || ""} helperText="* оставьте поле пустым, если автор жив" />
        <Input name="img" label="Ссылка на фото" required onChange={onChange} value={formData.img} />
      </FormDialog>
    </MainTemplate>
  )
}