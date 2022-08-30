import * as React from 'react';
import Typography from '@mui/material/Typography';
import { IChildren } from '../../interfaces/IChildren';
import { Fragment } from 'react';

export default function Title(props: IChildren) {
  return (
    <Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        {props.children}
      </Typography>
    </Fragment>
  );
}
