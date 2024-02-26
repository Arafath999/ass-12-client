import SectionTitle from "../SectionTitle/SectionTitle";
import img6 from "../../assets/images/pic2.jpg"
import './Featured.css'

const Featured = () => {
    return (
        <div className="featured-item bg-fixed text-white pt-8 my-20">
            <SectionTitle subHeading="check it out" heading="Featured Item" ></SectionTitle>
            <div className="md:flex justify-center items-center bg-slate-500 bg-opacity-60 pb-20 pt-12 px-36">
                <div>
                    <img src={img6} alt="" />
                </div>
                <div className="md:ml-10">
                    <p>Aug 20, 2029</p>
                    <p className="uppercase">Where can i get some?</p>
                    <p>Real estate companies are businesses that manage, buy, sell, invest, and develop properties – including land, residential homes, and other buildings. Many real estate businesses also offer services to help their clients find the right property, negotiate prices, and manage the sale or lease process. So how do real estate businesses work? Read on to find out!</p>
                    <button className="btn btn-outline border-0 border-b-4 mt-4">Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;