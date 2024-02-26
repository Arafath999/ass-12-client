import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Components/Hooks/useAxiosSecure";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";


const ManageUser = () => {
    const axiosSecure = useAxiosSecure();
    const {data: users = [],refetch} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data
        }
    })

    const handleDeleteUser = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                refetch()
                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deleteCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch();
                        }
                    })

            }
        });

    }

    const handleMakeAgent = user => {
        axiosSecure.patch(`/users/agent/${user._id}`)
        .then(res => {
            console.log(res.data)
            if(res.data.modifiedCount > 0){
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} is an Agent `,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
            
        })

    }
    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
        .then(res => {
            console.log(res.data)
            if(res.data.modifiedCount > 0){
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} is an admin`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
            
        })

    }
    return (
        <div>
            <div className="flex justify-evenly mt-4">
                <h2 className="text-2xl">Manage User</h2>
                <h2 className="text-2xl">All  User: {users.length}</h2>
            </div>
            <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Email</th>
        <th>Admin</th>
        <th>Agent</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        users.map((user, index) => <tr key={user.id}>
            <th>{index + 1}</th>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
            { user.role === 'admin' ? 'Admin' :<button onClick={() => handleMakeAdmin(user)} className="btn btn-md bg-orange-500 justify-start"><FaUsers className="text-white text-2xl" /></button>}
            </td>
            <td>
            { user.role === 'agent' ? 'Agent' :<button onClick={() => handleMakeAgent(user)} className="btn btn-md bg-orange-500 justify-start"><FaUsers className="text-white text-2xl" /></button>}
            </td>
            <td>
            <button onClick={() => handleDeleteUser(user)} className="btn btn-ghost justify-start">Delete<FaTrashAlt /></button>

            </td>
            <td>

            </td>
          </tr>)
      }
      
    </tbody>
  </table>
</div>
        </div>
    );
};

export default ManageUser;