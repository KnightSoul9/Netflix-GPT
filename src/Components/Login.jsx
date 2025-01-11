import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignIn, setIsSign] = useState(true);
  const toggleSignInForm = () => {
    setIsSign(!isSignIn);
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
      <form className="w-3-12-custom p-12 bg-black absolute my-36 mx-auto right-0 left-0 text-white bg-opacity-80">
        <h1 className="font-bold text-3xl mb-10 ">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>
        {
            !isSignIn&&<input
            type="text"
            placeholder="Full  Name"
            className="p-2 my-4 w-full bg-gray-600 rounded-lg"
            />
        }
        <input
          type="text"
          placeholder="Email Address"
          className="p-2 my-4 w-full bg-gray-600 rounded-lg"
        />
        <input
          type="text"
          placeholder="Password"
          className="p-2 my-4 w-full bg-gray-600 rounded-lg"
        />
        <button className="p-4 my-6 bg-red-800 w-full rounded-lg">
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
