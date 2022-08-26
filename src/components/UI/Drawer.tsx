import { Fragment, useState } from "react";
import { Drawer, IconButton, List, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const pages = ["Main Feature", "Popular Course", "Login", "SignUp"];
const links = ["feature", "courses", "signin", "signup"];

const DrawerComp = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <Fragment>
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List>
          <MenuItem onClick={() => setOpenDrawer(false)}>X</MenuItem>
          {pages.map((page, index: number) => (
            <MenuItem key={page} component={Link} to={`/${links[index]}`}>
              {page}
            </MenuItem>
          ))}
        </List>
      </Drawer>
      <IconButton edge="end" onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon />
      </IconButton>
    </Fragment>
  );
};

export default DrawerComp;
