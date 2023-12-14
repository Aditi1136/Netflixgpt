import React, { useEffect } from 'react'
import {onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, USER_AVATAR } from '../utils/constants';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store =>store.user)

  const handleSignOut = ()=>{
    signOut(auth).then(() => {
      
    }).catch((error) => {
      navigate("/error")
    });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, 
          const {uid , email, displayName, photoURL} = user;
          dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}))
          navigate("/Browse")
        } else {
          // User is signed out
          dispatch(removeUser());
          navigate("/")
        }
      });

      //Unsubscribe when component unmounts
      return () =>unsubscribe();
  },[]);
  
  return (
    <div className='absolute bg-gradient-to-b from-black z-10 w-full flex justify-between'>
        <img 
        className='w-44 '
        src={LOGO} alt='logo'/>
    
    
    {user && <div className='flex p-4'>
      <img 
      className='w-12 h-12 '
      src={USER_AVATAR} alt='display user'/>
      
      <button  onClick={handleSignOut} className='font-bold text-white'>(Sign Out)</button>
    </div>
}
    </div>
  )
}

export default Header