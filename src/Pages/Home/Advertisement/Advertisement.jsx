

import { useEffect, useState } from "react";
import useProperties from "../../../Components/Hooks/useProperties";
import PropertiesCard from "../../PropertiesCard/PropertiesCard";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";


const Advertisement = () => {
    const [allProperties, loading] = useProperties();
    const [filteredProperties, setFilteredProperties] = useState([]);

    useEffect(() => {
        // You can set your filtering logic here
        const filtered = allProperties.filter(property => property.verificationStatus === "Pending Verification");
        setFilteredProperties(filtered);
    }, [allProperties]);

    return (
        <div>
            <SectionTitle heading="ADVERTISEMENT" subHeading="Affordable State"></SectionTitle>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 space-y-5 mb-4 mt-4">
                    
                        {filteredProperties.map(property => <PropertiesCard key={property._id} property={property}></PropertiesCard>
                        )}
                    
                </div>
            )}
        </div>
    );
};

export default Advertisement;
