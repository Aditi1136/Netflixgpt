import React, { useEffect } from 'react'
import {onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LANGUAGES_AVAILABLE, LOGO, USER_AVATAR } from '../utils/constants';
import { toggleGPTSearch } from '../utils/gptSlice';
import { Rocket } from 'lucide-react';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store =>store.user)
  const showGptSearch = useSelector(store => store.gpt.showGptSearch)


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

  const handleGPTSearch = () => {
    //Toggle GPT Search
    dispatch(toggleGPTSearch())
  }

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value))
  }
  
  return (
    <div className='absolute bg-gradient-to-b from-black z-10 w-full flex justify-between'>
        <img 
        className='w-44 '
        src={LOGO} alt='logo'/>
    
    
    {user &&(
    <div className='flex p-4'>
  
      {showGptSearch && (
         <select className='p-2   bg-gray-900 text-white  rounded-lg' onChange={handleLanguageChange}>
         {LANGUAGES_AVAILABLE.map(lang => <option key={lang.identifier} value={lang.identifier}>
           {lang.name}
           </option>)}
       </select>
      )}
     
    <div title='GPT mode'>
    <button
        onClick={handleGPTSearch}
        className='px-3 w-[43px] mr-2  ml-2 py-3  hover:bg-opacity-80 bg-brand-charcoal rounded-full text-white font-semibold '>
        {showGptSearch ? (
            <Rocket
              color='red'
              fill='red'
              />) 
              : (
            <Rocket className=' my-[-2px] py-1 ml-[-2px]' />
          )}
    </button>  
    </div>   
    <img 
      className='w-12 h-12 '
      src={USER_AVATAR} alt='display user'/>
      
      <button  onClick={handleSignOut} className='font-bold text-white mx-2'>(Sign Out)</button>
    </div>
    )
}
    </div>
  )
}

export default Header