import { useContext, useEffect, useState } from 'react';
import imgLogin from '../../assets/images/login.jpg'
import { loadCaptchaEnginge, LoadCanvasTemplate,  validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialLogin from '../../Components/SocialLogin/SocialLogin';
const Login = () => {
    const [disabled, setDisabled] = useState(true)
    const {signIn} = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()

    const from = location.state?.form?.pathname || "/"

    
    useEffect( () => {
        loadCaptchaEnginge(6);
    },[])
    // backGround Picture style
    const backgroundStyle = {
        backgroundImage: `url(${imgLogin})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh', // Set to the minimum height you desire
      };
    //   handle login 
    const handleLogin = event => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email,password)
        signIn(email,password)
        .then(result => {
            const user = result.user
            console.log(user)
            navigate(from, {replace: true})
        })
    }
    const handleValidedCaptcha = (e) => {
        const user_captcha_value_ = e.target.value;
        if(validateCaptcha(user_captcha_value_)){
            setDisabled(false)
        }else{
            setDisabled(true)
        }
        console.log(user_captcha_value_)

    }
    return (
        <div className="hero" style={backgroundStyle}>
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
          </div>
          <div className="card shrink-0 w-full  shadow-2xl bg-opacity-60 bg-base-100 h-[100vh]">
            <form onSubmit={handleLogin}  className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-2xl font-bold text-red-700">Email</span>
                </label>
                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold text-2xl text-red-700">Password</span>
                </label>
                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                
              </div>
              <div className="form-control">
          <label className="label">
          <LoadCanvasTemplate />
          </label>
          <input onBlur={handleValidedCaptcha} type="text" name="captcha" placeholder="type the captcha above" className="input input-bordered" required />

          {/* <button className="btn btn-outline mt-2 w-24 btn-xs">Valide</button> */}
        </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
                
              </div>
              
              <div className='mt-4'>
              <div className="divider">OR</div>
              <SocialLogin></SocialLogin>
              </div>
            </form>
            
            <p className='text-center text-3xl mb-4'><small>new here ? <Link className='text-red-800 text-3xl font-bold' to="/signup">Create an account</Link></small></p>
          </div>
        </div>
      </div>
    );
};

export default Login;