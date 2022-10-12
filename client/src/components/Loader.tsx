import { Box, CircularProgress } from '@mui/material'
import React from 'react'

export const Loader: React.FC = ({ }) => {
  
  return (
    <Box sx={{  zIndex: 3001,
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',}}>
      <CircularProgress />
    </Box>
  )
}