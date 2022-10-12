import { Button, ButtonProps, CircularProgress } from '@mui/material'
import React from 'react'

type IProps = {loading: boolean} & ButtonProps

export const LoadingButton: React.FC<IProps> = ({loading, children, ...btnProps}) => {
  
  return (
    <Button {...btnProps}>
      {children}
      {loading && <CircularProgress sx={{ml: {xs: 1, sm: 2}}} color="inherit" size={16} />}
    </Button>
  )
}