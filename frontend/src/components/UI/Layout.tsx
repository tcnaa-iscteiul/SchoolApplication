import { Fragment } from 'react'
import Header from './Header'
import { Container } from '@mui/material'
import { IChildren } from '../../interfaces/IChildren'

const Layout = (props: IChildren): JSX.Element => {
  return (
    <Fragment>
      <Header />
      <Container>{props.children}</Container>
    </Fragment>
  )
}

export default Layout
