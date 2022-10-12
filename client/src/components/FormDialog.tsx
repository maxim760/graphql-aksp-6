import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ReactFCWithChildren } from '../utils/types';
import { LoadingButton } from './LoadingButton';

type IProps = {
  open: boolean,
  loading: boolean,
  onClose(): void,
  onSubmit(): void,
  title: string,
}

export const FormDialog: ReactFCWithChildren<IProps> = ({open, onClose, onSubmit, loading, title, children}) => {
  if (!open) {
    return null
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent >
          {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Закрыть</Button>
          <LoadingButton type="submit" loading={loading}>Сохранить</LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
}
