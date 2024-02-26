import { useState, useEffect } from 'react';
import useAxiosSecure from '../Components/Hooks/useAxiosSecure';
import PropertyCard from './PropertyCard';
import useAuth from '../Components/Hooks/useAuth';

const MyAddedProperties = () => {
  const { user } = useAuth();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const userEmail = user?.email
    
    if (userEmail) {
      
      axiosSecure.get(`/properties?agentEmail=${userEmail}`)
        .then((response) => setProperties(response.data))
        .catch((error) => setError(error.message))
        .finally(() => setLoading(false));
    }
  }, [axiosSecure, user?.email]);
  const updateVerificationStatus = async (propertyId, newStatus) => {
    try {
    
      const response = await axiosSecure.put(`/properties/${propertyId}`, {
        verificationStatus: newStatus,
      });

      if (response.status === 200) {
        
        setProperties((prevProperties) =>
          prevProperties.map((property) =>
            property._id === propertyId ? { ...property, verificationStatus: newStatus } : property
          )
        );
      } else {
       
        console.error('Failed to update verification status');
      }
    } catch (error) {
      console.error('Error updating verification status', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 space-y-4'>
      {/* Display each property card */}
      {properties.map((property) => (
      <PropertyCard
        key={property._id}
        property={property}
        onUpdateVerificationStatus={(propertyId, newStatus) =>
          updateVerificationStatus(propertyId, newStatus, axiosSecure)
        }
      />
    ))}
    </div>
  );
};

export default MyAddedProperties;
