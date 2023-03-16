import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';

type PropsType = {
  title: string;
  nr: string;
  icon?: JSX.Element;
};

export const CardStats = ({ title, nr, icon }: PropsType) => (
  <Card>
    <CardContent>
      <Grid container spacing={3}>
        <Grid item>
          <Typography gutterBottom variant="h4">
            {title}
          </Typography>
          <Typography color="primary" variant="h4">
            {nr}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar variant="rounded">{icon}</Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);
