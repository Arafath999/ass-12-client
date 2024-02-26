import { useState, useEffect } from 'react';
import useAxiosSecure from '../Components/Hooks/useAxiosSecure';
import SectionTitle from '../Components/SectionTitle/SectionTitle';

const UserReviewsPage = () => {
    const axiosSecure = useAxiosSecure();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axiosSecure.get('/user-reviews');
                setReviews(response.data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, [axiosSecure]);

    const handleDeleteReview = async (reviewId) => {
        try {
            await axiosSecure.delete(`/reviews/${reviewId}`);
            // Update the reviews state by filtering out the deleted review
            setReviews((prevReviews) => prevReviews.filter((review) => review._id !== reviewId));
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    return (
        <div>
            <SectionTitle heading='review' subHeading='Manage Review' />
            <div className='grid grid-cols-2 lg:grid-cols-2 ml-4 space-y-4 space-x-4'>
                {reviews.map((review) => (
                    <div className="card w-96 bg-gray-200 shadow-2xl" key={review._id}>
                        <figure className="px-10 pt-10">
                            <img src={review.userPhotoURL} alt={`${review.userDisplayName}'s photo`} style={{ height: '120px', width: '120px', borderRadius: '50%' }} />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className='card-title'>Email: {review.userEmail}</h2>
                            <p className='font-bold'>Name: {review.userDisplayName}</p>
                            <p>Review: {review.reviewText}</p>
                            <div className='card-actions'>
                                <button className="btn btn-outline btn-secondary border-0 border-b-4" onClick={() => handleDeleteReview(review._id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default UserReviewsPage;
