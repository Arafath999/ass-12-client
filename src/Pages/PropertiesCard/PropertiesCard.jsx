import { Link } from "react-router-dom";



const PropertiesCard = ({ property }) => {
    const {

        propertyImage,
        propertyTitle,
        propertyLocation,
        agentName,
        agentImage,
        agentEmail,
        verificationStatus,
        priceRange
    } = property;

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={propertyImage} alt={propertyTitle} /></figure>
            <div className="card-body">
                <h2 className="card-title">
                    {propertyTitle}
                    <div className="">Price Range: {priceRange}</div>
                </h2>
                <p className="font-bold text-2xl">Agent: {agentName}</p>
                <p className="font-bold">AgentEmail: {agentEmail}</p>
                <div className="card-actions flex">
                    <img src={agentImage} alt={`${agentName}'s photo`} style={{ height: '120px', width: '120px', borderRadius: '50%' }} />
                    {/* <Link to={`/details/${property._id}`} className="btn btn-primary">Details</Link> */}
                    <Link className='btn btn-secondary' to={`/details/${property._id}`}>View Details</Link>
                </div>
                <div className="card-actions justify-end">
                    <div className="badge badge-primary">Verification Status: {verificationStatus}</div>
                    <div className="badge badge-secondary">{propertyLocation}</div>
                </div>
            </div>
        </div>

    );

};


export default PropertiesCard;
