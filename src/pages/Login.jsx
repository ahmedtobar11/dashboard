/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../Components/logincomponents/LoginForm";
export default function Login({ isUserLoggedIn=true }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate("/");
    }
  }, [isUserLoggedIn, navigate]);

  return (
    <div className="w-full h-screen flex justify-center items-center">
  <div className="hero min-h-screen text-lg container">
    <div className="hero-content flex-col md:flex-row-reverse min-w-full items-center">
      <div className="hidden md:block md:w-1/2 mx-5 text-center relative">
        <img
          src="loginAdmin.svg"
          alt="Login image"
          className="mb-0"
        />
      </div>
      
      <div className="card w-full md:w-1/2 bg-s-light shadow-2xl p-6 border-2 border-main shadow-main-light">
        <LoginForm />
      </div>
    </div>
  </div>
</div>
   
  );
}
