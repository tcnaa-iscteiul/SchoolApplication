import React, { useState } from "react";
import {
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";


const pages = ["Main Feature", "Popular Course", "ABoutUs", "Login", "SignUp"];

const DrawerComp = () => {
    const [openDrawer, setOpenDrawer] = useState(false);

    return (
        <React.Fragment>
            <Drawer
                anchor="right"
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
            >
                <List>
                    <ListItemButton>
                        <ListItemIcon>
                            <ListItemText sx={{ align: "center" }} onClick={()=>setOpenDrawer(false) }>X</ListItemText>
                        </ListItemIcon>
                    </ListItemButton>
                    {pages.map((page, index:number) => (
                        <ListItemButton key={index}>
                            <ListItemIcon>
                                <ListItemText sx={{align:"center"} }>{page}</ListItemText>
                            </ListItemIcon>
                        </ListItemButton>
                    ))}
                </List>
            </Drawer>
            <IconButton
                sx={{ color: "white", marginLeft: "auto" }}
                onClick={() => setOpenDrawer(!openDrawer)}
            >
                <MenuIcon />
            </IconButton>
        </React.Fragment>
    );
};

export default DrawerComp;