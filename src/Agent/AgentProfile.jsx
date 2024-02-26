import { useQuery } from "@tanstack/react-query";
import useAuth from "../Components/Hooks/useAuth";
import useAxiosSecure from "../Components/Hooks/useAxiosSecure";
import { FaHome } from "react-icons/fa";

const AgentProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Use the user's email to get agent-specific data
//   const { data: agentStats } = useQuery(['agent-stats', user?.email], {
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/agent-stats/${user?.email}`);
//       return res.data;
//     },
//   });

  const { data: agentStats } = useQuery({
    queryKey: ['agent-stats'],
    queryFn: async () => {
        const res = await axiosSecure.get(`/agent-stats/${user?.email}`);
        return res.data;
    }
})

  return (
    <div>
      <h2 className="text-2xl text-orange-900 text-center font-bold mt-4">Agent Profile</h2>
      <div>
        <div className="card card-side bg-base-100 shadow-xl mt-4 ml-8">
          <figure><img src={user?.photoURL} alt="Movie" /></figure>
          <div className="card-body">
            <h2 className="card-title">{user?.displayName}</h2>
            <h2 className="card-title">{user?.email}</h2>
            <div className="stats shadow mt-4 ml-4">

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaHome className="text-5xl"></FaHome>
                    </div>
                    <div className="stat-title">Properties</div>
                    <div className="stat-value">{agentStats?.properties}</div>
                    <div className="stat-desc">Jan 1st - Feb 1st</div>
                </div>

                
            </div>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Watch</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentProfile;
