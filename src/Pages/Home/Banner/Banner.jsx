import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './Banner.css'; // Import your CSS file for styling

import img1 from '../../../assets/images/pic1.jpg'
import img2 from '../../../assets/images/pic2.jpg'
import img3 from '../../../assets/images/pic3.jpg'
import img4 from '../../../assets/images/pic4.jpg'

import img6 from '../../../assets/images/pic6.jpg'

const Banner = () => {
    return (
        <div className="banner-container">
            <Carousel>
                <div className="slide">
                    <img src={img1} alt="Slide 1" />
                    <div className="legend">
                        <h2 className='text-3xl font-bold text-orange-600'><i>KHAN GROUP OF STATE</i></h2>
                        <p className='text-2xl font-bold '>Raj Property Today land is tomorrow home with dreams</p>
                    </div>
                </div>
                <div className="slide">
                    <img src={img2} alt="Slide 2" />
                    <div className="legend">
                        <h2 className='text-3xl font-bold text-orange-600'>KHAN GROUP OF STATE</h2>
                        <p className='text-2xl font-bold '>Raj Property Today land is tomorrow home with dreams</p>
                    </div>
                </div>
                <div className="slide">
                    <img src={img3} alt="Slide 2" />
                    <div className="legend">
                        <h2 className='text-3xl font-bold text-orange-600'>KHAN GROUP OF STATE</h2>
                        <p className='text-2xl font-bold '>Raj Property Today land is tomorrow home with dreams</p>
                    </div>
                </div>
                <div className="slide">
                    <img src={img4} alt="Slide 2" />
                    <div className="legend">
                        <h2 className='text-3xl font-bold text-orange-600'>KHAN GROUP OF STATE</h2>
                        <p className='text-2xl font-bold '>Raj Property Today land is tomorrow home with dreams</p>
                    </div>
                </div>
                <div className="slide">
                    <img src={img6} alt="Slide 2" />
                    <div className="legend">
                        <h2 className='text-3xl font-bold text-orange-600'>KHAN GROUP OF STATE</h2>
                        <p className='text-2xl font-bold '>Raj Property Today land is tomorrow home with dreams</p>
                    </div>
                </div>
                {/* Repeat the structure for other slides */}
            </Carousel>
        </div>
    );
};

export default Banner;
