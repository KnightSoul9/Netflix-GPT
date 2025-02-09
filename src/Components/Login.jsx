import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../Utils/Validate.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Utils/Firebase.js";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice.js";
import { BG_URL, USER_AVATAR } from '../Utils/constants';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;
  
    if (!isSignInForm) {
      if (!name.current || !name.current.value.trim()) {
        setErrorMessage("Full Name is required for Sign Up.");
        return;
      }
  
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value.trim(),
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid,
                  email,
                  displayName,
                  photoURL,
                })
              );
              navigate("/browse");
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          navigate("/browse");
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }
  };

  return (
    <div className="min-h-screen relative">
      <Header />
      <div className="absolute inset-0">
        <img
          src={BG_URL}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      
      <div className="relative z-10 flex justify-center items-center min-h-screen px-4">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full max-w-md p-8 md:p-12 bg-black/80 rounded-lg shadow-2xl backdrop-blur-sm transform transition-all duration-300 hover:shadow-red-600/20"
        >
          <h1 className="font-bold text-2xl md:text-3xl mb-8 text-white text-center">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>
          
          {!isSignInForm && (
            <input
              ref={name}
              type="text"
              placeholder="Full Name"
              className="p-3 my-4 w-full bg-zinc-800 text-white rounded-md border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300"
            />
          )}
          
          <input
            ref={email}
            type="email"
            placeholder="Email Address"
            className="p-3 my-4 w-full bg-zinc-800 text-white rounded-md border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300"
          />
          
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="p-3 my-4 w-full bg-zinc-800 text-white rounded-md border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300"
          />

          {errorMessage && (
            <p className="text-red-500 text-sm font-medium py-2 animate-pulse">{errorMessage}</p>
          )}

          <button
            className="p-3 my-6 bg-red-600 w-full rounded-md font-semibold text-white hover:bg-red-700 transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            onClick={handleButtonClick}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          <div className="flex items-center space-x-2 mb-6">
            <input
              type="checkbox"
              id="remember-me"
              className="h-4 w-4 text-red-600 focus:ring-red-600 border-zinc-600 rounded"
            />
            <label htmlFor="remember-me" className="text-sm text-gray-300 select-none">
              Remember Me
            </label>
          </div>

          <p
            className="text-center text-gray-300 cursor-pointer hover:text-white transition-colors duration-300"
            onClick={toggleSignInForm}
          >
            {isSignInForm
              ? "New to Netflix? Sign Up Now"
              : "Already have an account? Sign In"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
