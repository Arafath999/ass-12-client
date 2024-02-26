import {
    createBrowserRouter
   
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Shared/Login/Login";
import SignUp from "../Shared/SignUp/SignUp";
import AllProperties from "../Pages/AllProperties/AllProperties";
import Details from "../Components/Details/Details";
import Dashboard from "../Layout/Dashboard/Dashboard";
import Wishlist from "../Layout/Dashboard/Wishlist/Wishlist";
import MyProfile from "../Layout/Dashboard/MyProfile/MyProfile";
import MakeOfferForm from "../Layout/Dashboard/MakeOfferForm/MakeOfferForm";
import UserReviews from "../Layout/Dashboard/userReviews/userReviews";
import PropertyBrought from "../Layout/Dashboard/PropertyBrought/PropertyBrought";
import ManageUser from "../Layout/Dashboard/ManageUser/ManageUser";
import AgentProfile from "../Agent/AgentProfile";
import AddProperty from "../Agent/AddProperty";
import MyAddedProperties from "../Agent/MyAddedProperties";

import UpdatedFromCreation from "../Agent/UpdatedFromCreation";
import RequestedProperties from "../Agent/RequestedProperties";
import AdminProfile from "../Admin/AdminProfile";
import ManageProperties from "../Admin/ManageProperties";
import ReviewAgent from "../Admin/ReviewAgent";
import Payment from "../Layout/Dashboard/Payment/Payment";
import PaymentHistory from "../Layout/Dashboard/PaymentHistory/PaymentHistory";
import SoldProperties from "../Agent/SoldProperties";





  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>
            
        },
        {
          path: 'allproperties',
          element: <AllProperties></AllProperties>
        },
        {
          path: 'details/:id',
          element: <Details></Details>,
          loader: ({params}) => fetch(`https://assignment-12-server-eight-olive.vercel.app/properties/${params.id}`)
        }
      ]
    },
    {
      path: '/login',
      element: <Login></Login>
    },
    {
      path: '/signup',
      element: <SignUp></SignUp>
    },
    {
      path: 'dashboard',
      element: <Dashboard></Dashboard>,
      children: [
        {
          path: 'wishlist',
          element: <Wishlist></Wishlist>
          
        },
        {
          path: 'profile',
          element: <MyProfile></MyProfile>
        },
        {
          path: 'wishlist/makeoffer/:id',
          element: <MakeOfferForm />,
          loader: ({params}) => fetch(`https://assignment-12-server-eight-olive.vercel.app/wishlist/${params.id}`)
          
        },
        {
          path: 'myreviews',
          element: <UserReviews></UserReviews>
        },
        {
          path: 'payment',
          element: <Payment/>
        },
        {
          path: 'paymentHistory',
          element: <PaymentHistory/>
        },
        {
          path: 'brought',
          element: <PropertyBrought></PropertyBrought>
        },
        // agent routes
        {
          path: 'agentProfile',
          element: <AgentProfile/>
        },
        {
          path: 'agentProperties',
          element: <AddProperty></AddProperty>
        },
        {
          path: 'myAddedProperties',
          element: <MyAddedProperties></MyAddedProperties>
        },
        {
          path: 'soldProperties',
          element: <SoldProperties/>
        },
        {
          path: 'myAddedProperties/update-form/:id',
          element: <UpdatedFromCreation/>,
          loader: ({params}) => fetch(`https://assignment-12-server-eight-olive.vercel.app/properties/${params.id}`)
        },
        {
          path: 'requestedProperties',
          element: <RequestedProperties/>
        },
        // admin Routes
        {
          path: 'manageUsers',
          element: <ManageUser></ManageUser>
        },
        {
          path: 'adminProfile',
          element: <AdminProfile/>
        },
        {
          path: 'manageProperties',
          element: <ManageProperties/>
        },
        {
          path: 'manageReviews',
          element: <ReviewAgent/>
        }
      ]
    }
  ]);