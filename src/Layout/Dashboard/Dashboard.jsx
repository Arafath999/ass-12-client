import { NavLink, Outlet } from "react-router-dom";
import useWishList from "../../Components/Hooks/useWishList";

import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAdmin from "../../Components/Hooks/useAdmin";
import useAgent from "../../Components/Hooks/useAgent";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [wishlist] = useWishList();

  const [isAdmin] = useAdmin();
  const [isAgent] = useAgent();
  // const isAdmin = user && user.role === "admin";
  // const isAgent = user && user.role === "agent";

  return (
    <div className="flex">
      <div className="w-64 min-h-full bg-red-300">
        <ul className="menu p-4 font-bold">
          {isAdmin && (
            <>
              <li>
                <NavLink to="/dashboard/adminProfile">Admin Profile</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageProperties">Manage Properties</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageReviews">Manage Reviews</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageUsers">Manage Users</NavLink>
              </li>
            </>
          )}
          {isAgent && (
            <>
              <li>
                <NavLink to="/dashboard/agentProfile">Agent Profile</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/agentProperties">Add Properties</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myAddedProperties">My added Properties</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/soldProperties">My sold Properties</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/requestedProperties">Requested Properties</NavLink>
              </li>
            </>
          )}
          {!isAdmin && !isAgent && (
            <>
              <li>
                <NavLink to="/dashboard/wishlist">My Wishlist ({wishlist.length})</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/profile">My Profile</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/brought">Property Brought</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myreviews">My Review</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/paymentHistory">Pay: History</NavLink>
              </li>
            </>
          )}
          <div className="divider">OR</div>
          <li>
            <NavLink to="/">HOME</NavLink>
          </li>
          <li>
            <NavLink to="/allproperties">All Properties</NavLink>
          </li>
        </ul>
      </div>
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
