import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { FaEye,FaEyeSlash } from 'react-icons/fa';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleAuthProvider, getAuth, signInWithPopup, updateProfile } from "firebase/auth";
import app from "../../Firebase/Firebase.config";
import { Helmet } from "react-helmet-async";

const SignUp = () => {
  const [showPassword,setShowPassword] = useState(false)

  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then(result => {
        const user = result.user;
        toast('Your are successfully log in')
        console.log(user)
      })
      .catch(error => {
        console.log(error)
       
      })
  }

  const { createUser } = useContext(AuthContext)

  const handleSignUp = e => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get('name');
    const image = form.get('image')
    const email = form.get('email');
    const password = form.get('password');
    console.log(name, image, email, password)

    if (password.length < 6) {
      return toast('Password should be at least 6 characters or longer')
    } else if (!/[A-Z]/.test(password)) {
      return toast('Your password should have at least one uppercase letter (A-Z)')
    } else if (!/[!@#$%^&*]/.test(password)) {
      return toast('Your password should have at least one special character')
    }

    // create user 
    createUser(email, password)
      .then(result => {
        const user = result.user;

        toast('User created successfully')
        updateProfile(user, {
          displayName: name, photoURL: image

        }).then(() => {

        }).catch((error) => {
          console.log(error)
        
        });

        e.target.reset()
        navigate(location?.state ? location.state : '/')

      })
      .catch(error => {
        console.log(error)
        toast(error.message)
      })

  }
  return (
    <div>
              <Helmet>
  <title>DonateBlood | SignUp</title>
 </Helmet>

      <div className="hero">
        <div className="hero-content ">
          <div className="card lg:w-[300px] shadow-2xl bg-base-100 ">
            <h1 className="text-center text-3xl font-bold mt-3">Please Register</h1>
            <form onSubmit={handleSignUp} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" name="name" placeholder="Enter Your Name" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo</span>
                </label>
                <input type="text" name="image" placeholder="Enter Your Photo" className="input input-bordered"  />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name="email" placeholder="Enter Your Email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text"> Password</span>
                 
                </label>
                
                <div className="relative">
                <input
                 type={showPassword ? "text" : "password"} 
                 name="password" 
                 placeholder="Enter Your Password" 
                 className="input input-bordered" required />

              
                </div>
                   
              </div>
              <div className="form-control mt-6">
                <button className="bg-gradient-to-r from-cyan-800  to-cyan-500 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-800 text-xl  px-4 py-2 rounded-md text-white">Register</button>
              </div>
            </form>
            <p className="text-center text-sm mb-4">Already  have an account? <Link to='/login' className="text-cyan-800 font-bold">Login</Link> here</p>
            <div className="divider">OR</div>
            <p className="text-center ">sign in with</p>
            <button onClick={handleGoogleSignIn} className=" font-bold mb-2 btn bg-cyan-800 hover:bg-cyan-600 text-white w-[35%]  mx-auto  ">Google</button>
          
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default SignUp;