import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { addUser } from '../Utils/userSlice';
import { removeUser } from '../Utils/userSlice';
import {auth} from '../Utils/Firebase'
import { LOGO } from '../Utils/constants';


const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((store)=>store.user)
    useEffect(()=>{

    const unsubscribe =  onAuthStateChanged(auth, (user) => {
        if (user) {
          //If user does not exist then create a new one and direct him to the browse page
          const {uid,email,displayName,photoURL} = user;
          dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}))
        } else {
          //This is the logic for the logout the user and send him to home page
          dispatch(removeUser());
          navigate('/')
        }
      });
      //Unsubscribe the onAuthStateChanged when the component is unmount
      return ()=>unsubscribe();
    },[])
    const handleSignOut=()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
      navigate('/error')
    });
  };
  return (
    <div className='absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-screen flex justify-between'>
        <img
        className='w-44'
        src={LOGO} 
        alt='Logo'/>
       {user&&( <div className='flex p-2'>
          <img className='w-12 h-12' alt='usericon' src={user?.photoURL} />
          <button onClick={handleSignOut} className='font-bold text-white'>(Sign Out)</button>
        </div>
)}
    </div>
  )
}
export default Header