import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../Utils/Validate.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/Firebase.js";

const Login = () => {
  const [isSignIn, setIsSign] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const email = useRef(null);
  const password = useRef(null); //this will give all the value input that are present in the input field
  const toggleSignInForm = () => {
    setIsSign(!isSignIn);
  };
  const handleButtonClick = () => {
    //Validate
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;
    if (!isSignIn) {
      //Sign up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          //this will add the user to database and get the user logged in
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorMessage + "-" + errorCode);
        });
    } else {
      //Sign in Logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
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
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignIn && (
          <input
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
          {isSignIn ? "Sign In" : "Sign Up"}
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
          {isSignIn
            ? "New to Netflix? Sign Up Now"
            : "Already have an account? Sign In"}
        </p>
      </form>
    </div>
  );
};

export default Login;
