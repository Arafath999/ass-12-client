import SectionTitle from "../Components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";

import useAxiosPublic from "../Components/Hooks/useAxiosPublic";
import useAxiosSecure from "../Components/Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router-dom";
import useAuth from "../Components/Hooks/useAuth";



const image_hosting_key = 'a21869a45d2a9507af8132a38b0ba8af';
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdatedFromCreation = () => {
  
  const { user } = useAuth();
  const { propertyTitle,propertyLocation,agentName,priceRange,_id} = useLoaderData()
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    console.log(data);

    // Image upload to imgbb and then get URL
    const imageFile = { image: data.propertyImage[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (res.data.success) {
      const menuItem = {
        propertyTitle: data.propertyTitle,
        propertyLocation: data.propertyLocation,
        agentName: data.agentName,
        agentEmail: data.agentEmail,
        priceRange: data.priceRange,
        propertyImage: res.data.data.display_url,
      };

      try {
        const menuRes = await axiosSecure.patch(`/properties/${_id}`, menuItem);
        console.log(menuRes.data);

        // Update property
        if (menuRes.data.success) {
          // Show the pop-up item using SweetAlert2
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `${data.propertyTitle} is updated successfully`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } catch (error) {
        console.error('Error updating property:', error);
        // Handle error (e.g., show an error message to the user)
      }
    }
  };

  return (
    <div>
      <SectionTitle heading="Update Properties" subHeading="What is new"></SectionTitle>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control bg-gray-400 rounded-xl pl-2 pr-2 w-full gap-4 ml-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Property Title</span>
              </label>
              <input
                type="text"
                defaultValue={propertyTitle}
                placeholder="propertyTitle"
                {...register('propertyTitle', { required: true })}
                required
                className="input input-bordered w-full"
              />
              
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Property Location</span>
              </label>
              <input
                type="text"
                defaultValue={propertyLocation}
                placeholder="propertyLocation"
                {...register('propertyLocation', { required: true })}
                required
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Agent Name</span>
              </label>
              <input
                type="text"
                defaultValue={agentName}
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
                {...register('agentEmail', { required: true })}
                required
                defaultValue={user?.email}
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
                  placeholder="Min Price-Max Price"
                  defaultValue={priceRange}
                  {...register('priceRange', { required: true })}
                required
                  className="input input-bordered w-1/2"
                />
              </div>
            </div>


            <div className="w-full ml-4 mt-4">
              <input {...register('propertyImage', { required: true })} type="file" className="file-input w-full max-w-xs" />
            </div>

            <button type="submit" className="btn w-52 mb-2 ml-4 mt-4 bg-green-600">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatedFromCreation;
