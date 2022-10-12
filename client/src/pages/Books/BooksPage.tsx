import { useQuery } from '@apollo/client'
import { Box, Card, Grid, CardMedia, CardContent, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { GET_BOOKS, IBooksData } from '../../api/query/getBooks'
import { Loader } from '../../components/Loader'
import { MainTemplate } from '../../components/template/MainTemplate'
import { PageUrls } from '../../utils/routes'

export const BooksPage: React.FC = ({ }) => {
  const { data, error, loading } = useQuery<IBooksData>(GET_BOOKS)
  if (loading) {
    return <MainTemplate title="Загрузка"><Loader /></MainTemplate>
  }
  if (error) {
    return <MainTemplate title="Ошибка">{`Ошибка :(`}</MainTemplate>
  }
  return (
    <MainTemplate title='Все книги'>
      <Box sx={{ m: 2 }}>
        <Grid container spacing={{xs: 1, md: 2}}>
          {data?.books.map((book) => (
            <Grid key={book._id} item xs={12} sm={6} md={4} lg={3} xl={2}>
              <Link to={PageUrls.book(book._id)}>
              <Card>
                <CardMedia
                  component="img"
                  height="340"
                  sx={{objectFit: "contain"}}
                  image={book.img}
                  alt=""
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {book.name}
                  </Typography>
                </CardContent>
              </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </MainTemplate>
  )
}