import { Fragment, useState } from 'react'
import { Drawer, IconButton, List, MenuItem } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { Link } from 'react-router-dom'

const pages = [
  { id: 1, value: 'Main Feature' },
  { id: '2', value: 'Popular Course' },
  { id: '3', value: 'Login' },
  { id: '4', value: 'SignUp' },
]
const links = ['feature', 'courses', 'signin', 'signup']

const DrawerComp = () => {
  const [openDrawer, setOpenDrawer] = useState(false)

  return (
    <Fragment>
      <Drawer anchor="right" open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List>
          <MenuItem onClick={() => setOpenDrawer(false)}>X</MenuItem>
          {pages.map((page, index: number) => (
            <MenuItem key={page.id} component={Link} to={`/${links[index]}`}>
              {page.value}
            </MenuItem>
          ))}
        </List>
      </Drawer>
      <IconButton edge="end" onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon />
      </IconButton>
    </Fragment>
  )
}

export default DrawerComp
