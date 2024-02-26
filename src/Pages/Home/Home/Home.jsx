import Featured from "../../../Components/Featured/Featured";
import Testimonial from "../../../Shared/Testimonial/Testimonial";
import Advertisement from "../Advertisement/Advertisement";

import Banner from "../Banner/Banner";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Featured></Featured>
            <Advertisement></Advertisement>
            <Testimonial></Testimonial>
        </div>
    );
};

export default Home;