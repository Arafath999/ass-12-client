import { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../Components/Hooks/useAxiosSecure';
import useAuth from '../Components/Hooks/useAuth';

const image_hosting_key = 'a21869a45d2a9507af8132a38b0ba8af';
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateForm = () => {
  const { user } = useAuth();
  const property = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const [propertyData, setPropertyData] = useState({
    propertyImage: property.propertyImage,
    propertyTitle: property.propertyTitle,
    propertyLocation: property.propertyLocation,
    agentName: property.agentName,
    agentEmail: user?.email,
    priceRange: property.priceRange,
  });

  useEffect(() => {
    // If the property data changes, update the propertyData state
    setPropertyData({
      propertyImage: property.propertyImage || '',
      propertyTitle: property.propertyTitle || '',
      propertyLocation: property.propertyLocation || '',
      agentName: property.agentName || '',
      agentEmail: user?.email || '',
      priceRange: property.priceRange || '',
    });
  }, [property, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPropertyData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axiosSecure.post(image_hosting_api, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        // Update propertyData with the new image URL
        setPropertyData((prevData) => ({
          ...prevData,
          propertyImage: response.data.data.display_url,
        }));
      } else {
        console.error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image', error);
    }
  };

  const onSubmit = async (data) => {
    const response = await axiosSecure.patch(`/properties/${property._id}`, data);

    // Handle the response as needed
    if (response.status === 200) {
      // Update the local state with the new property data
      setPropertyData(data);
     
    } else {
      console.error('Failed to update property');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Render form fields with propertyData and handleInputChange */}
        <div className="form-control bg-gray-400 rounded-xl pl-2 pr-2 w-full gap-4 ml-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Property Title</span>
            </label>
            <input
              type="text"
              name="propertyTitle"
              value={propertyData.propertyTitle}
              onChange={handleInputChange}
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Property Location</span>
            </label>
            <input
              type="text"
              name="propertyLocation"
              value={propertyData.propertyLocation}
              onChange={handleInputChange}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Agent Name</span>
            </label>
            <input
              type="text"
              name="agentName"
              value={propertyData.agentName}
              onChange={handleInputChange}
              {...register('agentName', { required: true })}
              required
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Agent Email</span>
            </label>
            <input
              type="text"
              name="agentEmail"
              {...register('agentEmail', { required: true })}
              required
              value={user?.email || ''}
              onChange={handleInputChange}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Price Range</span>
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                name="priceRange"  // Make sure the input has the correct name
                placeholder="Min Price-Max Price"
                value={propertyData.priceRange}
                onChange={handleInputChange}
                className="input input-bordered w-1/2"
              />
            </div>
          </div>

          {/* Input for image upload */}
          <div className="form-control w-full my-6">
            <label>
              <span className='font-bold ml-4'>Property Image:</span>
              <input {...register('propertyImage', { required: true })} type="file" onChange={handleImageUpload} className="file-input w-full max-w-xs" />
            </label>
          </div>

          {/* Include a submit button to call the handleSubmit function */}
          <button type="submit" className="btn w-52 mb-2 ml-4 mt-4 bg-green-600">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateForm;
