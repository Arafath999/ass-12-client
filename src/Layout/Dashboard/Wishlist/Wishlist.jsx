import Swal from "sweetalert2";
import useWishList from "../../../Components/Hooks/useWishList";

import { FaGitAlt, FaTrashAlt } from "react-icons/fa";
import useAxiosSecure from "../../../Components/Hooks/useAxiosSecure";


import {  Link} from "react-router-dom";



const Wishlist = () => {
    const [wishlist, refetch] = useWishList()
    const axiosSecure = useAxiosSecure();
    // const navigate = useNavigate();


    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/wishlist/${id}`)
                    .then(res => {
                        if (res.data.deleteCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch();
                        }
                    })

            }
        });
    }
    // const handleMakeOffer = (itemId) => {
    //     const item = wishlist.find((item) => item._id === itemId);
    //   console.log(item)
    //     navigate(`/dashboard/wishlist/makeoffer/${itemId}`);
    // };


    return (
        <div>
            <h2 className="text-2xl">wishlist</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 space-y-6 ml-4">
                {
                    wishlist.map(item => <div key={item._id} className="card w-96 bg-base-100 shadow-xl">
                        <figure><img src={item.propertyImage} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">
                                {item.propertyTitle}
                                <div className="badge text-red-600">{item.priceRange}</div>
                            </h2>

                            <p className="font-bold text-2xl">Agent: {item.agentName}</p>
                            <div className="card-actions flex">
                                <img src={item.agentImage} alt={`${item.agentName}'s photo`} style={{ height: '120px', width: '120px', borderRadius: '50%' }} />
                                <p></p>
                            </div>
                            <div className="card-actions justify-center">
                                <h3 className="font-bold text-pink-800">Verification Status: {item.verificationStatus}</h3>
                                <h2 className="font-bold text-blue-800">{item.propertyLocation}</h2>
                            </div>
                            <div className="flex space-x-6 text-black">
                                <button onClick={() => handleDelete(item._id)} className="btn btn-outline btn-info justify-start">Delete<FaTrashAlt /></button>
                                <Link
                                    to={`/dashboard/wishlist/makeoffer/${item._id}`}
                                    className="btn btn-outline btn-info"
                                >
                                    Make offer <FaGitAlt />
                                </Link>
                                {/* <Link
                                    to={{
                                        pathname: `/dashboard/wishlist/makeoffer/${item._id}`,
                                        state: { item }
                                    }}
                                    className="btn btn-outline btn-info"
                                >
                                    Make offer <FaGitAlt />
                                </Link> */}
                                {/* <button
                                    onClick={() => handleMakeOffer(item._id)}
                                    className="btn btn-outline btn-info"
                                >
                                    Make offer <FaGitAlt />
                                </button> */}
                                
                                
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Wishlist;