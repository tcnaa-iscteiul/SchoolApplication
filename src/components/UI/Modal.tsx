import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function ResponsiveDialog(props:any) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClose = () => {
        props.onClose();
    };

    let content:string = props.message || ' Please wait for the e-mail confirmation!';

    return (
        <React.Fragment>
            <Dialog
                fullScreen={fullScreen}
                open={props.open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title" color="primary">
                    {props.title.toUpperCase()}
                </DialogTitle>
                <DialogContent style={{minWidth:400} }>
                    <DialogContentText>
                        {content}
                    </DialogContentText>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained" autoFocus>
                        Ok
                    </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}