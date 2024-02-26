import axios from 'axios';
import { useEffect, useState } from 'react';
import useAuth from '../../../Components/Hooks/useAuth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiFillDelete } from "react-icons/ai";
const UserReviews = () => {
  const [userReviews, setUserReviews] = useState([]);
  const { user } = useAuth(); 
 
  
  console.log(user)

  useEffect(() => {
    const fetchUserReviews = () => {
      if (user && user.email) {
        axios
          .get('http://localhost:5000/reviews', {
            params: {
              userEmail: user.email,
            },
          })
          .then((response) => {
            setUserReviews(response.data);
          })
          .catch((error) => {
            console.error('Error fetching user reviews', error);
          });
      } else {
        // Handle the case where user or user.email is null or undefined
        console.error('User object or user.email is null or undefined');
      }
    };

    fetchUserReviews();
  }, [user]); // Dependency array includes user, so the effect will re-run when user changes
  const handleDeleteReview = (reviewId) => {
    axios
      .delete(`http://localhost:5000/reviews/${reviewId}`)
      .then(() => {
        // Remove the deleted review from the state
        setUserReviews((prevReviews) =>
          prevReviews.filter((review) => review._id !== reviewId)
        );
        toast.success('Review deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting review', error);
      });
  };
  
  


  return (
    <div className='space-y-4 grid grid-cols-1 lg:grid-cols-2 mt-8'>
      {userReviews.map((review) => (
        <div key={review._id} className="review-card pl-4 pr-4 card w-96 bg-base-100 shadow-xl ml-8">
          <h3 className='font-bold'>{review.propertyTitle}</h3>
          <p className='font-bold'>Agent: {review.agentName}</p>
          <p className='font-bold'>Review Time: {review.timestamp}</p>
          <p className='text-red-600'><span className='font-bold text-black'>Comment:</span> {review.reviewText}</p>
          <AiFillDelete className='btn w-16 btn-outline btn-primary' onClick={() => handleDeleteReview(review._id)}>Delete</AiFillDelete>
        </div>
      ))}
    </div>
  );
};

export default UserReviews;
