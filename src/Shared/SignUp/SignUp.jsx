import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
import useAxiosPublic from "../../Components/Hooks/useAxiosPublic";



const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const {createUser,updateUserProfile} = useContext(AuthContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  

  const onSubmit = (data) => {
    console.log(data)
    createUser(data.email, data.password)
    .then(result => {
      const loggedUser = result.user;
      console.log(loggedUser)
      updateUserProfile(data.name, data.photoURL)
      .then(() => {
        console.log('user profile info updated')
        const userInfo = {
          name: data.name,
          email: data.email
        }
        axiosPublic.post('/users', userInfo)
        .then(res => {
          if(res.data.insertedId){
          console.log('user profile info updated')
          reset()
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User created successfully",
            showConfirmButton: false,
            timer: 1500
          });
          navigate('/')
        }
        })
        
        
        
      })
      .catch(error => console.log(error))
    })
  }

    return (
        <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Sign Up!</h1>
     
    </div>
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" {...register("name", { required: true })} name="name" placeholder="name" className="input input-bordered" />
                {errors.name && <span className="text-red-800">Name field is Required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input type="text" {...register("photoURL", { required: true })}  placeholder="photoURL" className="input input-bordered" />
                {errors.photoURL && <span className="text-red-800">Name field is Required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" {...register("email")} name="email" placeholder="email" className="input input-bordered" />
                {errors.name && <span className="text-red-800">Email field is Required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" {...register("password", {
                  required: true, minLength: 6,
                  maxLength: 20,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                })} placeholder="password" className="input input-bordered" />
                {errors.password?.type === 'required' && <p className="text-red-800" role="alert">password is required</p>}
                {errors.password?.type === 'minLength' && <p className="text-red-800" role="alert">password is must be 6 required</p>}
                {errors.password?.type === 'maxLength' && <p className="text-red-800" role="alert">password must be less 20 charector</p>}
                {errors.password?.type === 'pattern' && <p className="text-red-800" role="alert">password must be one uppercase one lowercase,one number and one special charector</p>}
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <input className="btn btn-primary" type="submit" value="sign up" />
              </div>
              <div className='mt-4'>
              <div className="divider">OR</div>
              <SocialLogin></SocialLogin>
              </div>
            </form>
            <p className='text-center text-3xl mb-4'><small>If you have already account <Link className='text-red-800 text-3xl font-bold' to="/login">LOGIN</Link></small></p>
    </div>
  </div>
</div>
    );
};

export default SignUp;