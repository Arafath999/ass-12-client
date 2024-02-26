import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useWishList from "../Hooks/useWishList";
import { useState } from "react";
import { useEffect } from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
// swiper collection
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';


const Details = () => {
    const property = useLoaderData();
    const { user } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const axiosSecure = useAxiosSecure()
    const [reviewText, setReviewText] = useState("");
    const [reviews, setReviews] = useState([]);
    console.log(property)
    const { propertyTitle, propertyLocation, propertyImage, agentName, agentEmail, agentImage, verificationStatus, priceRange, _id } = property;
    const [, refetch] = useWishList()
    //   review get item
    useEffect(() => {
        axiosSecure.get(`https://assignment-12-server-eight-olive.vercel.app/reviews/${_id}`)
            .then((res) => {
                setReviews(res.data);
            })
            .catch((error) => {
                console.error("Error fetching reviews:", error);
                // Handle error if needed
            });
    }, [_id, axiosSecure]);

    const handleAddToWishList = item => {

        if (user && user.email) {
            console.log(item, user.email)
            const propertyItem = {
                propertyId: _id,
                email: user.email,
                propertyTitle,
                propertyLocation,
                propertyImage,
                agentName,
                agentEmail,
                agentImage,
                verificationStatus,
                priceRange

            }
            axiosSecure.post('https://assignment-12-server-eight-olive.vercel.app/wishlist', propertyItem)
                .then(res => {
                    console.log(res.data)
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${propertyTitle} add to your wishlist`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        refetch()
                    }
                })
            // 
        }
        else {
            Swal.fire({
                title: "please login to add to the cart?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, LOGIN"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            });

        }
    }

    const handleReviewSubmit = () => {
        if (!reviewText.trim()) {
            Swal.fire({
                icon: "warning",
                title: "Review cannot be empty!",
                showConfirmButton: true,
            });
            return;
        }

        // Send the review text to the backend
        axiosSecure.post(`https://assignment-12-server-eight-olive.vercel.app/reviews`, {
            propertyId: _id,
            userEmail: user.email,
            userDisplayName: user.displayName,
            userPhotoURL: user.photoURL,
            reviewText: reviewText,
        })
            .then((res) => {
                console.log(res.data);
                if (res.data.success) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Review submitted successfully!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    // Optionally, you can clear the textarea or close the modal
                    setReviewText("");
                    document.getElementById('my_modal_1').close();
                }
            })
            .catch((error) => {
                console.error("Error submitting review:", error);
                // Handle error if needed
            });
    };


    return (
        <>
            <div className="card w-full bg-red-300 bg-opacity-50 shadow-xl mt-4 mb-4">
                <figure><img src={propertyImage} alt={propertyTitle} /></figure>
                <div className="card-body">
                    <h2 className="card-title font-bold text-2xl text-green-700">
                        {propertyTitle}
                        <div className="">Price Range: {priceRange}</div>
                    </h2>
                    <p className="font-bold text-2xl">Agent: {agentName}</p>
                    <p className="font-bold text-2xl">Agent: {agentEmail}</p>
                    <div className="card-actions flex">
                        <img src={agentImage} alt={`${agentName}'s photo`} style={{ height: '120px', width: '120px', borderRadius: '50%' }} />
                        <p></p>
                    </div>
                    <div className="card-actions justify-center">
                        <h3 className="text-2xl font-bold text-pink-800">Verification Status: {verificationStatus}</h3>
                        <h2 className="text-2xl font-bold text-blue-800">{propertyLocation}</h2>
                    </div>
                    <div className="flex justify-center items-center">
                        <button onClick={handleAddToWishList} className="btn btn-outline btn-success w-56">Add to Wishlist</button>
                        <button className="btn w-56 ml-4 btn-outline btn-warning" onClick={() => document.getElementById('my_modal_1').showModal()}>Review</button>
                        <dialog id="my_modal_1" className="modal">
                            <div className="modal-box">
                                <textarea
                                    placeholder="Review"
                                    className="textarea textarea-bordered textarea-lg w-full max-w-xs"
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                ></textarea>
                                <div className="modal-action">
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button onClick={handleReviewSubmit} className="btn btn-outline mr-4 btn-warning justify-start">Submit</button>
                                        <button className="btn btn-outline mr-4 btn-success" onClick={() => document.getElementById('my_modal_1').close()}>Close</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                    </div>
                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                    {/* this is a review section */}

                </div>
            </div>
            <section>
            <SectionTitle
                subHeading="What Our Client Say"
                heading={'Testimonials'}
            ></SectionTitle>
            <h3 className="text-2xl text-center font-bold mb-4">Reviews:</h3>
            <Swiper navigation={true} modules={[Navigation]}   className="mySwiper">
                
                {reviews.map((review, index) => (
                    <SwiperSlide key={index} className="mb-2">
                        <div className="flex flex-col items-center mx-24 my-16">
                            {/* <Rating
                                style={{ maxWidth: 180 }}
                                value={review.rating}
                                readOnly
                            /> */}
                            <img src={review.userPhotoURL} alt="" style={{ height: '150px', width: '150px', borderRadius: '50%' }} />
                            <p className="py-8 text-2xl font-bold">{review.reviewText}</p>
                            <h3 className="text-2xl text-orange-400">{review.userEmail}</h3>
                            <h3 className="text-2xl text-red-600">{review.userDisplayName}</h3>
                            
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            </section>
        </>

    );
};

export default Details;