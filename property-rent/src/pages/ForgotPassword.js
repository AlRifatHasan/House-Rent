import React, { useState } from "react";
import Layout from "./../components/Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Email was sent");
      navigate("/signin");
    } catch (error) {
      toast.error("Somthing went wrong");
    }
  };
  return (
    <Layout>
      <div className="d-flex  align-items-center justify-content-center w-100 mt-4">
        <form className="bg-light p-4" onSubmit={onSubmitHandler}>
          <h4 className="bg-dark p-2 mt-2 text-light text-center">Password Reset</h4>
          <div className="form-floating mb-3">
            <input type="email" value={email} className="form-control" id="exampleInputEmail1" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} aria-describedby="emailHelp" />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <button type="submit" className="btn btn-primary">Reset</button>
          <Link to="/signin" className="ms-5">Sing In</Link>
          <div id="emailHelp" className="form-text"> We'll never share your email with anyone else.</div>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
