import React from 'react'
import { Container } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'
import Header from './Header'

const StyledContainer = styled(Container)({
  height: '100vh',
  margin: '2em',
})

const Layout = ({ children }) => (
  <>
    <Header />
    <StyledContainer>{children}</StyledContainer>
  </>
)

export default Layout
