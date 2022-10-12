import { useMutation, useQuery } from '@apollo/client'
import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ADD_LIBRARY, IAddLibraryData, IAddLibraryVariable } from '../../api/mutation/addLibrary'
import { GET_LIBRARIES, ILibrariesData } from '../../api/query/getLibraries'
import { FormDialog } from '../../components/FormDialog'
import { Input } from '../../components/Input'
import { Loader } from '../../components/Loader'
import { MainTemplate } from '../../components/template/MainTemplate'
import { showToast } from '../../utils/functions'
import { useForm } from '../../utils/hooks'
import { PageUrls } from '../../utils/routes'

type ILibraryForm = {
  name: string,
  address: string,
}

const defaultFormData = {
  name: "",
  address: "",
}

export const LibrariesPage: React.FC = ({ }) => {
  const { data, loading, error } = useQuery<ILibrariesData>(GET_LIBRARIES)
  const [addLibrary, mutationData] = useMutation<IAddLibraryData, IAddLibraryVariable>(ADD_LIBRARY, {
    refetchQueries: [{query: GET_LIBRARIES}]
  })
  const { formData, onChange, setFormData } = useForm<ILibraryForm>(defaultFormData)
  const [open, setOpen] = useState(false)
  const onClickOpen = () => setOpen(true)
  const onClose = () => {
    mutationData.reset()
    setFormData(defaultFormData)
    setOpen(false)
  }
  const onSubmit = async () => {
    try {
      const result = await addLibrary({ variables: { library: formData } })
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
    <MainTemplate title="Список библиотек">
      <Button onClick={onClickOpen}>Добавить</Button>
      <Box sx={{m: 2}}>
        <Grid container spacing={{xs: 1, md: 2}}>
          {data && data.libraries.map((item) => (
            <Grid key={item._id} item xs={12} sm={6} md={4} lg={3} xl={2}>
              <Box component={Link} sx={{height: "100%", display: "flex"}} to={PageUrls.library(item._id)}>
                <Paper sx={{display: "flex", flexDirection: "column", p:2, width: "100%"}}>
                  <Typography variant='h4' sx={{fontSize: "20px", lineHeight: 1.15}}>{item.name}</Typography>
                  <div>{item.address}</div>
                  <Box sx={{mt: "auto"}}>Кол-во книг в библиотеке: {item.books.length}</Box>
                </Paper>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <FormDialog open={open} onClose={onClose} onSubmit={onSubmit} loading={mutationData.loading} title='Создание библиотеки'>
        <Input name="name" label="Название" required onChange={onChange} value={formData.name} />
        <Input name="address" label="Адрес" required onChange={onChange} value={formData.address} />
      </FormDialog>
    </MainTemplate>
  )
}