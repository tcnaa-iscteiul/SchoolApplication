import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import DialogContent from '@mui/material/DialogContent';


const LoadSpinner = (): JSX.Element => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <React.Fragment>
            <Dialog fullScreen={fullScreen} open={true}>
                <DialogContent style={{ backgroundColor: 'transparent' }} >
                    <CircularProgress />
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}

export default LoadSpinner;