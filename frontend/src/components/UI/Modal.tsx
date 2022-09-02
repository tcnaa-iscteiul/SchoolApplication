import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import maxWidthModal from './theme';

type DialogProps = {
  open: boolean;
  title: string;
  message: string;
  onClose: () => void;
  onConfirm?: () => void;
  button?: boolean;
};

export default function ResponsiveDialog(props: DialogProps) {
  const fullScreen = useMediaQuery(`(max-width:${maxWidthModal}px)`);

  const handleClose = () => {
    props.onClose();
  };

  const handleConfirm = () => {
    if (props.onConfirm) props.onConfirm();
  };

  const content: string = props.message;

  return (
    <Dialog fullScreen={fullScreen} open={props.open} onClose={handleClose}>
      <DialogTitle color="primary">{props.title.toUpperCase()}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" autoFocus>
            {props.button ? 'Cancel' : 'OK'}
          </Button>
          {props.button && (
            <Button onClick={handleConfirm} variant="contained" autoFocus>
              Ok
            </Button>
          )}
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
