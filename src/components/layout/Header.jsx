import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'

const Header = () => {
  return (
    <AppBar position='static'>
        <Toolbar>
            <Typography variant='h6'>Jobs Posting Application</Typography>
        </Toolbar>
    </AppBar>
  )
}

export default Header