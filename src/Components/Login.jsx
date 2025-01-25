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
import { USER_AVATAR } from '../Utils/constants';
const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null); //this will give all the value input that are present in the input field
  const dispatch = useDispatch();
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
          console.log("User created:", user);
          updateProfile(user, {
            displayName: name.current.value.trim(),
            photoURL:{USER_AVATAR},
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              console.log("Profile updated:", { displayName, photoURL });
              dispatch(
                addUser({
                  uid,
                  email,
                  displayName,
                  photoURL,
                })
              );
            })
            .catch((error) => {
              console.error("Error updating profile:", error);
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error("Error creating user:", errorCode, errorMessage);
          setErrorMessage(errorMessage + "-" + errorCode);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error("Error signing in:", errorCode, errorMessage);
          setErrorMessage(errorMessage + "-" + errorCode);
        });
    }
  };  
  return (
    <div>
      <Header />
      <div className="absolute ">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/154a9550-ce07-4e28-819c-63185dd849f8/web/IN-en-20250106-TRIFECTA-perspective_27b02e7c-f668-4639-9e82-1a5485084b2a_large.jpg"
          alt="Background"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-3-12-custom p-12 bg-black absolute my-36 mx-auto right-0 left-0 text-white bg-opacity-80"
      >
        <h1 className="font-bold text-3xl mb-5 ">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-2 my-4 w-full bg-black rounded-sm border border-white focus:outline-none focus:ring-2 focus:ring-red-600 opacity-55 "
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-2 my-4 w-full bg-black rounded-sm border border-white focus:outline-none focus:ring-2 focus:ring-red-600 opacity-55"
        />
        <input
          ref={password}
          type="text"
          placeholder="Password"
          className="p-2 my-4 w-full bg-black rounded-sm border border-white focus:outline-none focus:ring-2 focus:ring-red-600 opacity-55"
        />

        <p className="text-red-700 text-lg font-bold py-2">{errorMessage}</p>
        <button
          className="p-3 my-6 bg-red-600 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="remember-me"
            className="h-4 w-4 text-red-800 focus:ring-red-800 border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="text-sm text-gray-300">
            Remember Me
          </label>
        </div>
        <p
          className="py-4 text-center text-gray-300 cursor-pointer hover:underline"
          onClick={toggleSignInForm}
        >
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already have an account? Sign In"}
        </p>
      </form>
    </div>
  );
};

export default Login;
