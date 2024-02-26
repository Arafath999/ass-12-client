
import { useEffect, useState } from "react";
import useProperties from "../../Components/Hooks/useProperties";
import PropertiesCard from "../PropertiesCard/PropertiesCard";

const AllProperties = () => {
    const [allProperties, loading] = useProperties();
    const [filteredProperties, setFilteredProperties] = useState([]);

    useEffect(() => {
        
        setFilteredProperties(allProperties);
    }, [allProperties]);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 space-y-5 mb-4 mt-4">
                    
                        {filteredProperties.map(property => <PropertiesCard key={property._id} property={property}></PropertiesCard>
                        )}
                    
                </div>
            )}
        </div>
    );
};

export default AllProperties;
