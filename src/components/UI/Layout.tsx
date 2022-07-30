import { Fragment } from 'react';
import Header from './Header';
import { Box } from "@mui/material";

const Layout = (props: any): JSX.Element => {

    return (
        <Fragment>
            <Header />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {props.children}
            </Box>
        </Fragment>
    );
};

export default Layout;