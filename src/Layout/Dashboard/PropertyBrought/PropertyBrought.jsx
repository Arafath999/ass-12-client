import axios from 'axios';
import { useEffect, useState } from 'react';
import useAuth from '../../../Components/Hooks/useAuth';
import { Link } from 'react-router-dom';

// ... (imports)

const PropertyBought = () => {
    const { user } = useAuth();
    console.log(user)
    const [boughtProperties, setBoughtProperties] = useState([]);


    useEffect(() => {
        const fetchBoughtProperties = () => {
            if (user?.email) {
                axios
                    .get(`https://assignment-12-server-eight-olive.vercel.app/makeoffer?buyerEmail=${user.email}`)
                    .then((response) => {
                        setBoughtProperties(response.data);

                    })
                    .catch((error) => {
                        console.error('Error fetching bought properties', error);

                    });
            }
        };

        fetchBoughtProperties();
    }, [user]);



    return (


        <div className='grid grid-cols-1 lg:grid-cols-2 ml-4 mt-8 space-y-4'>
            {boughtProperties.map((property) => (
                <div key={property._id} className="card w-96 bg-base-100 shadow-xl image-full">
                    <figure><img src={property.propertyImage} alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">{property.propertyTitle}</h2>
                        <p>{property.propertyLocation}</p>
                        <p>{property.agentName}</p>
                        <p>{property.verificationStatus}</p>
                        <p>{property.offeredAmount}</p>
                        <div className="card-actions justify-end">
                        {property.verificationStatus === 'accepted' && (
                                <Link to="/dashboard/payment">
                                    <button className="btn btn-outline text-white border-0 border-b-4 mt-4">Pay</button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>



    );
};




export default PropertyBought;
