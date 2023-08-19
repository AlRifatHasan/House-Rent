import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "./../components/Layout/Layout";
import { toast } from "react-toastify";
import { BsFillEyeFill } from "react-icons/bs";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase.config";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import OAuth from "../components/OAuth";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    type: "",
  });
  const { name, email, password, type } = formData;
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmitHndler = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      updateProfile(auth.currentUser, { displayName: name });
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), formDataCopy);
      toast.success("Signup Successfully !");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  return (
    <Layout>
      <div className="d-flex  align-items-center justify-content-center w-100 mt-4">
        <form className="bg-light p-4" onSubmit={onSubmitHndler}>
          <h4 className="bg-dark p-2 mt-2 text-light text-center">Sign Up </h4>
          <div className="form-floating mb-3">
            <input  type="text" value={name} className="form-control" id="name" placeholder="name" onChange={onChange} aria-describedby="nameHelp" />
            <label htmlFor="floatingInput" className="form-label">Full name</label>
          </div>
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
          <div className="form-floating mb-3">
            <select className="form-select" id="type" name="type"  onChange={onChange} aria-describedby="typeHelp">
              <option value="" selected>--Select--</option>
              <option value='Landlord' >Landlord</option>
              <option value='Tenant' >Tenant</option>
            </select>
            <label for="floatingSelect">Select a type</label>
          </div>
          <button type="submit" className="btn btn-primary">Sign up</button>
          <div>
            <OAuth />
            <span>Already User</span> <Link to="/signin">Sign In</Link>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Signup;
