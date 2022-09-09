import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import DialogContent from '@mui/material/DialogContent';
import maxWidthSpinner from './Theme';

const LoadSpinner = (): JSX.Element => {
  const fullScreen = useMediaQuery(`(max-width:${maxWidthSpinner}px)`);

  return (
    <Dialog fullScreen={fullScreen} open>
      <DialogContent>
        <CircularProgress />
      </DialogContent>
    </Dialog>
  );
};

export default LoadSpinner;
