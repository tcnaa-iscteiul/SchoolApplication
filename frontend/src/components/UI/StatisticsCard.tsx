import { Container, Grid, Box, Typography } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { memo, useEffect, useState } from 'react';
import { CardStats } from './CardStats';
import useAxios from '../../hooks/use-axios';
type Stats = {
  nrClasses: number;
  nrStudents: number;
  nrTeachers: number;
};
const StatisticsCard = () => {
  const [data, setData] = useState<Stats>();
  const { response, sendData } = useAxios({
    method: 'Get',
    url: 'auth/nr',
    data: '',
  });
  useEffect(() => {
    sendData();
    if (response) {
      setData(response.data);
    }
  }, []);
  return (
    <Box id="Main Feature" component="main">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid container>
            <Grid container justifyContent="center" alignItems="flex-start">
              <Typography gutterBottom variant="h2">
                Main Feature
              </Typography>
            </Grid>
            <Grid container justifyContent="center" alignItems="flex-start">
              <Typography gutterBottom variant="h5">
                The world's largest selection of courses
              </Typography>
            </Grid>
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <CardStats
              title={'Total Courses'}
              nr={`+${data?.nrClasses || 5}`}
              icon={<MenuBookIcon />}
            />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <CardStats
              title={'Total Students'}
              nr={`+${data?.nrStudents || 7}`}
            />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <CardStats
              title={'Total Teachers'}
              nr={`+${data?.nrTeachers || 9}`}
            />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <CardStats title={'New Courses'} nr={'0'} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default memo(StatisticsCard);
