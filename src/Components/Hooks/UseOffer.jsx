import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const UseOffer = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth();
    const {refetch,data: cart = [] } = useQuery({
        queryKey: ['makeoffer', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/makeoffer?buyerEmail=${user.email}`)
            return res.data

        }

    })
    return [cart,refetch]
};

export default UseOffer;