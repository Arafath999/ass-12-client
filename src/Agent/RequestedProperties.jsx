import SectionTitle from "../Components/SectionTitle/SectionTitle";
import useAxiosSecure from "../Components/Hooks/useAxiosSecure";
import { useEffect, useState } from "react";


const RequestedProperties = () => {

  const axiosSecure = useAxiosSecure();
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    // Fetch offers data from the backend
    const fetchOffers = async () => {
      try {
        const response = await axiosSecure.get("/makeoffer");
        setOffers(response.data);
      } catch (error) {
        console.error("Error fetching offers", error);
      }
    };

    fetchOffers();
  }, [axiosSecure]);

  const handleAccept = async (offerId) => {
    try {
      // Update the status to "accepted" on the backend
      await axiosSecure.put(`/makeoffer/${offerId}/accept`);
      // Update the status locally
      setOffers((prevOffers) =>
        prevOffers.map((offer) =>
          offer._id === offerId ? { ...offer, verificationStatus: "accepted" } : offer
        )
      );
    } catch (error) {
      console.error("Error accepting offer", error);
    }
  };

  const handleReject = async (offerId) => {
    try {
      // Update the status to "rejected" on the backend
      await axiosSecure.put(`/makeoffer/${offerId}/reject`);
      // Update the status locally
      setOffers((prevOffers) =>
        prevOffers.map((offer) =>
          offer._id === offerId ? { ...offer, verificationStatus: "rejected" } : offer
        )
      );
    } catch (error) {
      console.error("Error rejecting offer", error);
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
              <th>Buyer Email</th>
              <th>Buyer Name</th>
              <th>Offered Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr key={offer._id}>
                <td>{offer.propertyTitle}</td>
                <td>{offer.propertyLocation}</td>
                <td>{offer.buyerEmail}</td>
                <td>{offer.buyerName}</td>
                <td>{offer.offeredAmount}</td>
                <td>{offer.verificationStatus}</td>
                <td>
                  {offer.verificationStatus === "pending" && (
                    <>
                      <button className="btn btn-xs bg-green-600 text-white" onClick={() => handleAccept(offer._id)}>
                        Accept
                      </button>
                      <button className="btn btn-xs bg-red-600 text-white" onClick={() => handleReject(offer._id)}>
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
};

export default RequestedProperties;