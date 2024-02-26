import { useQuery } from "@tanstack/react-query";
import useAuth from "../Components/Hooks/useAuth";
import useAxiosSecure from "../Components/Hooks/useAxiosSecure";
import { FaCalculator, FaDollarSign, FaHome, FaUsers } from "react-icons/fa";


const AdminProfile = () => {
    const { user } = useAuth();
    console.log(user)
    const axiosSecure = useAxiosSecure()

    const { data: stats } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    })
    return (
        <div>
            <h2 className="text-2xl text-green-900 text-center font-bold mt-4"><span className="text-black">My Profile--</span>({
                user?.displayName ? user.displayName : 'Back'
            })</h2>
            <div>
                <div className="card card-side bg-base-100 shadow-xl mt-4 ml-8">
                    <figure><img src={user?.photoURL } alt="Movie" style={{ height: '120px', width: '120px', borderRadius: '50%' }} /></figure>
                    <div className="card-body">
                        <h2 className="card-title">{user?.displayName}</h2>
                        <h2 className="card-title">{user?.email}</h2>
                        
                    </div>
                </div>
            </div>
            <div className="stats shadow mt-4 ml-4">

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaDollarSign className="text-5xl"></FaDollarSign>
                    </div>
                    <div className="stat-title">Revenue</div>
                    <div className="stat-value">${stats?.revenue}</div>
                    <div className="stat-desc">Jan 1st - Feb 1st</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaUsers className="text-4xl"></FaUsers>
                    </div>
                    <div className="stat-title">Users</div>
                    <div className="stat-value">{stats?.users}</div>
                    <div className="stat-desc">↗︎ 400 (22%)</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaHome className="text-4xl"></FaHome>
                    </div>
                    <div className="stat-title">Properties</div>
                    <div className="stat-value">{stats?.properties}</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaCalculator className="text-4xl"></FaCalculator>
                    </div>
                    <div className="stat-title">Payment Collection</div>
                    <div className="stat-value">{stats?.paymentsCollection}</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>

            </div>


            
        </div>
    );
};

export default AdminProfile;