import Dropdown from '../UI/Dropdown';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Fragment } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react';
import { memo } from 'react';
import { Grid, ListItemText } from '@mui/material';
import { useAppSelector } from '../../hooks/use-redux';
import { IClass } from '../../interfaces/IClass';
import { IUser } from '../../interfaces';
import Title from './Title';

type AllStudents = {
  title: string;
};

const UserInClass = (props: AllStudents): JSX.Element => {
  const [clas, setClass] = useState<string>('');

  const classes = useAppSelector((state) => state.classes.classes);

  const { students, teacher } =
    clas && classes.find((c: IClass) => c.name === clas);

  return (
    <Fragment>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box display="flex">
          <Typography component="h1" variant="h5">
            {props.title}
          </Typography>
          <br />
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Dropdown
              classes={classes}
              key={Math.random()}
              manageUser={(name: string) => {
                setClass(name);
              }}
              value={clas}
            />
          </Grid>
          <Grid item xs={12}>
            <Title> Teachers</Title>
            {clas !== '' && (
              <ListItemText>
                {teacher
                  ? `${teacher.firstName} ${teacher.lastName} - ${teacher.email}`
                  : 'No teacher assigned to the class'}
              </ListItemText>
            )}
          </Grid>
          <Grid item xs={12}>
            <Title> Students</Title>
            {clas !== '' &&
              students.length !== 0 &&
              students.map((item: IUser) => (
                <ListItemText
                  primary={`${item.firstName} ${item.lastName} - ${item.email}`}
                />
              ))}
            {clas !== '' && students.length === 0 && (
              <ListItemText>{'No students assigned to the class'}</ListItemText>
            )}
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default memo(UserInClass);
