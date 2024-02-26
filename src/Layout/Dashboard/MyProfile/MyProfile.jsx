import useAuth from "../../../Components/Hooks/useAuth";


const MyProfile = () => {
    const { user } = useAuth();
    console.log(user)
    return (
        <div>
            <h2 className="text-2xl text-orange-900 text-center font-bold mt-4">My Profile</h2>
            <div>
                <div className="card card-side bg-base-100 shadow-xl mt-4 ml-8">
                    <figure><img src={user.photoURL} alt="Movie" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">{user.displayName}</h2>
                        <h2 className="card-title">{user.email}</h2>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Watch</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;