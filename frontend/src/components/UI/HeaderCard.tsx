import { Grid, Typography } from '@mui/material';
import homePageImage from './Images/homePageImage.png';

const HeaderCard = () => {
  return (
    <Grid container>
      <Grid container item lg={6} sm={6} xl={6} xs={12} sx={{ pl: 5 }}>
        <Grid container alignItems="flex-end">
          <Typography gutterBottom variant="h2">
            Upgrade Yourself
          </Typography>
        </Grid>
        <Grid container alignItems="flex-start">
          <Typography gutterBottom variant="h5">
            Anywhere, anytime. Start learning today! And Get and Exceptional
            Education Experience.
          </Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" item lg={6} sm={6} xl={6} xs={12}>
        <img
          src={homePageImage}
          alt={'homeImage'}
          loading="lazy"
          style={{
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </Grid>
    </Grid>
  );
};
export default HeaderCard;
