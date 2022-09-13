import { Box, Container, Grid, Typography } from '@mui/material';
import { Stats } from 'fs';
import { useState, useEffect, memo } from 'react';
import useAxios from '../../hooks/use-axios';
import MediaCard from './MediaCard';

const top5 = [
  {
    id: '.1',
    name: 'English',
    description:
      'Our hybrid English Online course allows you to mix in-centre classes and live online classes according to your needs and schedule.',
    img: '',
  },
  {
    id: '.2',
    name: 'Muzic',
    description:
      'Our music classes for kids provide a fun, comfortable environment for children around the world to make music with their families. ',
    img: '',
  },
  {
    id: '.3',
    name: 'German',
    description:
      'Learn German with these fun online German lessons. Get an introduction to German grammar and vocabulary as you follow our hero Jens on his adventures.',
    img: '',
  },
  {
    id: '.4',
    name: 'French',
    description:
      'French course for beginners - Learn french online for free with basic french dialogue, vocabulary and french grammar explanations.',
    img: '',
  },
  {
    id: '.5',
    name: 'Math',
    description:
      'The class Math contains methods for performing basic numeric operations such as the elementary exponential, logarithm, square root',
    img: '',
  },
];
type TypeData = {
  id: string;
  name: string;
  description: string;
};

const PopularCourse = () => {
  const request = new XMLHttpRequest();

  try {
    request.open('GET', 'products.json');

    request.responseType = 'json';

    console.log(request.responseType);
    request.addEventListener('error', () => console.error('XHR error'));

    request.send();
  } catch (error) {
    console.error(`XHR error ${request.status}`);
  }

  const [data, setData] = useState<[TypeData]>();
  const { response, sendData } = useAxios({
    method: 'Get',
    url: 'auth/classes',
    data: '',
  });

  useEffect(() => {
    sendData();
    if (response) {
      setData(response.data);
      console.log(data);
    }
  }, []);
  return (
    <Box id="Popular Course" component="main">
      <Container maxWidth={false}>
        <Grid container spacing={2}>
          <Grid container>
            <Grid container justifyContent="center" alignItems="flex-start">
              <Typography gutterBottom variant="h2">
                Popular Course
              </Typography>
            </Grid>
            <Grid container justifyContent="center" alignItems="flex-start">
              <Typography gutterBottom variant="h5">
                Choose from many options of popular course at a breakthrough
                price.
              </Typography>
            </Grid>
          </Grid>
          <Grid container justifyContent="center" spacing={2}>
            {data &&
              data.map((item) => (
                <Grid key={item.id} container item xl={2} lg={2} sm={6} xs={12}>
                  <MediaCard title={item.name} description={item.description} />
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default memo(PopularCourse);
