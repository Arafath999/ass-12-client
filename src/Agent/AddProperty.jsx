import { FaHome } from "react-icons/fa";
import SectionTitle from "../Components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form"
import useAuth from "../Components/Hooks/useAuth";
import useAxiosPublic from "../Components/Hooks/useAxiosPublic";
import useAxiosSecure from "../Components/Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = 'a21869a45d2a9507af8132a38b0ba8af';
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddProperty = () => {
    const { user } = useAuth();
    console.log(user)
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const { register, handleSubmit, reset } = useForm()
    const onSubmit = async (data) => {
        console.log(data)

        const priceRange = `$${data.minPrice} - $${data.maxPrice}`;
        // img upload to image bb and then get an url
        const imageFile = { image: data.propertyImage[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        console.log(res.data)
        if (res.data.success) {
            // Customize the addItem object based on your desired format
            const addItem = {
                propertyImage: res.data.data.display_url,
                propertyTitle: data.propertyTitle,
                propertyLocation: data.propertyLocation,
                agentName: data.agentName,
                agentImage: user?.photoURL,
                agentEmail: user?.email,
                verificationStatus: "Pending Verification",
                priceRange: priceRange,
            };

            // Use the addItem object as needed (e.g., send it to the server)
            const addMenu = await axiosSecure.post('/properties', addItem)
            console.log(addMenu.data);
            if (addMenu.data.insertedId) {

                reset()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.propertyTitle} is added to the menu`,
                    showConfirmButton: false,
                    timer: 1500,
                })
            }
        }
    };
    return (
        <div>
            <SectionTitle heading="Add Properties" subHeading="What is new"></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="form-control bg-gray-400 rounded-xl pl-2 pr-2 w-full gap-4 ml-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Property Title</span>
                            </label>
                            <input
                                type="text"
                                placeholder="propertyTitle"
                                {...register('propertyTitle', { required: true })}
                                required
                                className="input input-bordered w-full" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Property Location</span>
                            </label>
                            <input
                                type="text"
                                placeholder="propertyLocation"
                                {...register('propertyLocation', { required: true })}
                                className="input input-bordered w-full" />
                        </div>
                        {/* <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Property Image</span>
                            </label>
                            <input
                                type="text"
                                placeholder="propertyTitle"
                                {...register('propertyTitle')}
                                className="input input-bordered w-full" />
                        </div> */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Agent Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="agentName"
                                {...register('agentName', { required: true })}
                                defaultValue={user?.displayName || ''}
                                className="input input-bordered w-full" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Agent Email</span>
                            </label>
                            <input
                                type="text"
                                placeholder="agentEmail"
                                {...register('agentEmail', { required: true })}
                                defaultValue={user?.email || ''}
                                className="input input-bordered w-full" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Price Range</span>
                            </label>
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    placeholder="Min Price"
                                    {...register('minPrice', { required: true })}
                                    className="input input-bordered w-1/2"
                                />
                                <input
                                    type="text"
                                    placeholder="Max Price"
                                    {...register('maxPrice', { required: true })}
                                    className="input input-bordered w-1/2"
                                />
                            </div>
                        </div>

                        <div className="form-control w-full my-6">
                            <input {...register('propertyImage', { required: true })} type="file" className="file-input w-full max-w-xs" />
                        </div>
                        <button className="btn w-52 mb-2  ml-4 mt-4 bg-green-600">Add Property  <FaHome className="ml-4"></FaHome></button>
                    </div>


                </form>
            </div>
        </div>
    );
};

export default AddProperty;