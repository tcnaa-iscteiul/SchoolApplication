import { BottomNavigation } from '@mui/material';
import Layout from '../components/UI/Layout';
import Slider from "@mui/material/Slider";

const HomePage = () => {

    return <Layout>
        <Slider defaultValue={30} />
        <p>Welcome to home page!</p>

        <BottomNavigation />
    </Layout>;
}

export default HomePage;