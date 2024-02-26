import { useEffect, useState } from "react";
import SectionTitle from "../Components/SectionTitle/SectionTitle";
import useAxiosSecure from "../Components/Hooks/useAxiosSecure";


const ManageProperties = () => {
    const axiosSecure = useAxiosSecure();
  const [properties, setAllProperties] = useState([]);

  useEffect(() => {
    // Fetch offers data from the backend
    const fetchOffers = async () => {
      try {
        const response = await axiosSecure.get("/properties");
        setAllProperties(response.data);
      } catch (error) {
        console.error("Error fetching offers", error);
      }
    };

    fetchOffers();
  }, [axiosSecure]);

  const handleVerify = async (propertyId) => {
    try {
      await axiosSecure.put(`/properties/${propertyId}/verify`);
      // Update the local state after verification
      setAllProperties((prevProperties) =>
        prevProperties.map((property) =>
          property._id === propertyId
            ? { ...property, verificationStatus: "verified" }
            : property
        )
      );
    } catch (error) {
      console.error("Error verifying property", error);
    }
  };

  const handleReject = async (propertyId) => {
    try {
      await axiosSecure.put(`/properties/${propertyId}/reject`);
      // Remove the property from the local state after rejection
      setAllProperties((prevProperties) =>
        prevProperties.filter((property) => property._id !== propertyId)
      );
    } catch (error) {
      console.error("Error rejecting property", error);
    }
  };

return (
    <div>
      <SectionTitle heading="Offer-Request" subHeading="Handling-Request"></SectionTitle>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="font-bold">
              <th className="font-bold">Property Title</th>
              <th>Property Location</th>
              <th>Agent Email</th>
              <th>Agent Name</th>
              <th>Price Range</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property._id}>
                <td>{property.propertyTitle}</td>
                <td>{property.propertyLocation}</td>
                <td>{property.agentEmail}</td>
                <td>{property.agentName}</td>
                <td>{property.priceRange}</td>
                <td>{property.verificationStatus}</td>
                <td>
                  {property.verificationStatus !== "verified" && (
                    <>
                      <button className="btn btn-xs bg-green-600 text-white" onClick={() => handleVerify(property._id)}>
                        Verify
                      </button>
                      <button className="btn btn-xs bg-red-600 text-white" onClick={() => handleReject(property._id)}>
                        Reject
                      </button>
                    </>
                  )}
                </td>
                
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
                  }
export default ManageProperties;