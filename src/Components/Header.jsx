import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";
import { removeUser } from "../Utils/userSlice";
import { auth } from "../Utils/Firebase";
import { LOGO, SUPPORTED_LANGUAGES } from "../Utils/constants";
import { toggleGptSearchView} from "../Utils/gptSlice";
import lang from "../Utils/languageConstant";
import { changeLanguage } from "../Utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          addUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        );
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [dispatch, navigate]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setShowDropdown(false);
    } catch (error) {
      console.error("Sign-out error:", error);
      navigate("/error");
    }
  };

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="fixed top-0 left-0 right-0 px-2 sm:px-6 md:px-8 py-2 sm:py-3 bg-gradient-to-b from-black/90 to-black/60 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <img 
          className="w-16 sm:w-32 md:w-44 object-contain" 
          src={LOGO} 
          alt="Logo" 
        />
        
        {user && (
          <div className="flex items-center gap-1 sm:gap-4">
            {showGptSearch && (
              <select 
                className="hidden sm:block px-2 py-1.5 bg-gray-900 text-white rounded-lg border border-gray-700 hover:border-gray-500 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300"
                onChange={handleLanguageChange}
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.identifier} value={lang.identifier}>
                    {lang.name}
                  </option>
                ))}
              </select>
            )}
            
            <button 
              className="px-2 sm:px-4 py-1 sm:py-1.5 bg-purple-700 hover:bg-purple-600 text-white rounded-lg shadow-lg hover:shadow-purple-500/30 transition-all duration-300 text-xs sm:text-base font-medium"
              onClick={handleGptSearchClick}
            >
              {showGptSearch ? "Home" : "Search"}
            </button>
            
            <div className="relative">
              <img 
                className="w-6 h-6 sm:w-10 sm:h-10 rounded-full border-2 border-purple-500 shadow-lg cursor-pointer hover:border-purple-400 transition-colors duration-300" 
                alt="usericon" 
                src={user?.photoURL}
                onClick={() => setShowDropdown(!showDropdown)}
              />
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-black/95 rounded-lg shadow-lg border border-purple-500/30 backdrop-blur-sm">
                  <div className="py-2">
                    <p className="px-4 py-2 text-sm text-gray-300 border-b border-gray-700">
                      {user?.email}
                    </p>
                    <button 
                      onClick={handleSignOut}
                      className="w-full px-4 py-2 text-left text-sm text-white hover:bg-purple-700/30 transition-colors duration-300"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
