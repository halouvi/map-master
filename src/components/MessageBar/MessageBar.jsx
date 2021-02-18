import { useState } from 'react'
import { useListener } from 'react-bus'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { useToggle } from 'react-use'

export const MessageBar = () => {
  const [isOpen, toggleOpen] = useToggle(false)
  const [{ severity, txt }, setMessage] = useState({ severity: '', txt: '' })

  useListener('newMessage', newMessage => {
    setMessage(newMessage)
    toggleOpen(true)
  })

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={6000}
      open={isOpen}
      onClose={toggleOpen}>
      <MuiAlert variant="standard" onClose={toggleOpen} severity={severity}>
        {txt}
      </MuiAlert>
    </Snackbar>
  )
}
