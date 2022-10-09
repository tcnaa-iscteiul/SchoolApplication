import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Card, CardContent, Grid } from '@mui/material';

type PropsType = {
  title: string;
  description: string;
};

export default function MediaCard({ title, description }: PropsType) {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item>
            <Typography color="primary" gutterBottom variant="h3">
              {title}
            </Typography>
            <Typography variant="h6">{description}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
