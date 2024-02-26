

const ManageCard = ({ property }) => {
    console.log(property)
    const { propertyTitle, _id, propertyLocation, agentName, agentEmail, priceRange } = property;
    return (
        <div className="overflow-x-auto">
            <table className="table table-xs">
                <thead>
                    <tr>
                        <th>Property Title</th>
                        <th>Property Location</th>
                        <th>Agent Name</th>
                        <th>Agent Email</th>
                        <th>Price Range</th>
                    </tr>
                </thead>
                <tbody>

                    <tr key={_id}>
                        <td>{propertyTitle}</td>
                        <td>{propertyLocation}</td>
                        <td>{agentName}</td>
                        <td>{agentEmail}</td>
                        <td>{priceRange}</td>

                    </tr>

                </tbody>

            </table>
        </div>
    );
};

export default ManageCard;