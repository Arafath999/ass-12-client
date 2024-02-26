
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';



const PropertyCard = ({ property, onUpdateVerificationStatus }) => {
  const [newVerificationStatus, setNewVerificationStatus] = useState('');
  const { propertyTitle, propertyLocation, priceRange } = property;


  const handleUpdateStatus = () => {
    onUpdateVerificationStatus(property._id, newVerificationStatus);
    setNewVerificationStatus('');
  };


  return (
    <div className="card w-96 bg-base-100 shadow-xl ml-6 space-x-4 gap-4">
      {/* ... (existing code) */}
      <figure>
        <img src={property.propertyImage} alt={property.propertyTitle} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {property.propertyTitle}
          <div className="">Price Range: {property.priceRange}</div>
        </h2>
        <p className="font-bold text-2xl">Agent: {property.agentName}</p>
        <div className="card-actions flex">
          <img
            src={property.agentImage}
            alt={`${property.agentName}'s photo`}
            style={{ height: '120px', width: '120px', borderRadius: '50%' }}
          />
          <Link className="btn btn-outline btn-success" to={`/details/${property._id}`}>
            View Details
          </Link>
        </div>

        <div className="card-actions justify-end">
          {property.verificationStatus === 'verified' && (
            <div className="badge badge-primary">Verification Status: Verified</div>
          )}
          {property.verificationStatus === 'rejected' && (
            <div className="badge badge-outline">Verification Status: Rejected</div>
          )}
          {property.verificationStatus === 'pending' && (
            <div className="badge badge-warning">Verification Status: Pending</div>
          )}

          {/* Dropdown for selecting new status */}
          <select
            value={newVerificationStatus}
            onChange={(e) => setNewVerificationStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="verified">Verified</option>
            <option value="rejected">Rejected</option>
            <option value="pending">Pending</option>
          </select>
          {/* Button to update status */}
          {property.verificationStatus !== 'rejected' && (
            <button onClick={handleUpdateStatus} className="btn btn-outline border-0 border-b-4 mt-4">
              Updated Status
            </button>
          )}
          <Link
            to={{
              pathname: `/dashboard/myAddedProperties/update-form/${property._id}`,
              state: { property }, // Pass property details to the update form
            }}
            className="btn btn-outline border-0 border-b-4 mt-4"
          >
            Update Properties
          </Link>

          <div className="badge badge-secondary">{property.propertyLocation}</div>
        </div>
      </div>
    </div>
  );
};

PropertyCard.propTypes = {
  property: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    propertyImage: PropTypes.string.isRequired,
    propertyTitle: PropTypes.string.isRequired,
    priceRange: PropTypes.string.isRequired,
    agentName: PropTypes.string.isRequired,
    agentImage: PropTypes.string.isRequired,
    verificationStatus: PropTypes.string.isRequired,
    propertyLocation: PropTypes.string.isRequired,
  }).isRequired,
  onUpdateVerificationStatus: PropTypes.func.isRequired,
};

export default PropertyCard;

