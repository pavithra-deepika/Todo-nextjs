import { Container } from '@mui/system'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'
import styles from '../styles/Home.module.css'
import { TodoContext } from '../pages/TodoContext'
import { Alert, Snackbar } from '@mui/material'

export default function Home() {
  const [open, setOpen] = useState (false);
  const [alertType, setAlertType] = useState ("success");
  const [alertMessage, setAlertMessage] =useState("");
  const showAlert = (type,msg) => {
    setAlertType(type);
    setAlertMessage(msg);
    setOpen(true);
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <TodoContext.Provider value={{showAlert}}>
    <Container maxWidth="sm">
      <TodoForm />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertType} sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </Snackbar>
      <TodoList />
    </Container>
    </TodoContext.Provider>
  )
}
