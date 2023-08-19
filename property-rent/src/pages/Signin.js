import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BsFillEyeFill } from "react-icons/bs";
import Layout from "./../components/Layout/Layout";
import OAuth from "../components/OAuth";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  //loginHandler
  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        toast.success("Login Success");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid Email Or Password");
    }
  };
  return (
    <Layout>
      <div className="d-flex  align-items-center justify-content-center w-100 mt-4">
        <form className="bg-light p-4" onSubmit={loginHandler}>
          <h4 className="bg-dark p-2 mt-2 text-light text-center">Sign In </h4>
          <div className="form-floating mb-3">
            <input type="email" value={email} className="form-control" id="email" placeholder="name@example.com" onChange={onChange} aria-describedby="emailHelp" />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="input-group mb-3">
            <div className="form-floating">
              <input type={showPassword ? "text" : "password"} value={password}  className="form-control" id="password" placeholder="Password" onChange={onChange} aria-describedby="passwordHelp" />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <span className="input-group-text"> 
              <BsFillEyeFill className="text-danger ms-2" style={{ cursor: "pointer" }} onClick={()=>{setShowPassword((prevState)=>!prevState);}} />
            </span>
          </div>
          <button type="submit" className="btn btn-primary">Sign In</button>
            <Link to="/forgot-password" className="text-danger ms-5">Forgot Password</Link>
          <div>
            <OAuth />
            <span>New User</span> <Link to="/signup">Sign up</Link>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Signin;
