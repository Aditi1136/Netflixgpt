import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidateData } from '../utils/validate'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { USER_AVATAR } from '../utils/constants';

const Login = () => {
    const [isSignIn,setIsSignIn] = useState(true)
    const [errorMessage,setErrorMessage] = useState(null)
    
    const dispatch = useDispatch()

    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);

    const toggleSignIn = () =>{
        return (
            setIsSignIn (!isSignIn)
          
        )
    }

    const handleButton = () =>{
        const message = checkValidateData(email.current.value,password.current.value);
        setErrorMessage(message)

        if (message) 
        return;

        //Sign In / Sign up 
        if (!isSignIn){
            //Sign up logic
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
           
            .then((userCredential) => {
              // Signed up 
              const user = userCredential.user;

              updateProfile(user, {
                displayName: name.current.value, photoURL: USER_AVATAR
              })

              .then(() => {
                const {uid, email, displayName, photoURL} = auth.currentUser;
                dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}))      
                  
              })

              .catch((error) => {
                setErrorMessage(error.message)
              });
            
            
            })


            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              setErrorMessage(errorCode + errorMessage)
            });
        
        }
        else
        {
            // Sign In Logic
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
              // Signed in 
              const user = userCredential.user;
              
             
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              setErrorMessage(errorCode + errorMessage)
            });
        }
    }

  return (
    <div>
        <Header/>
        <div className='absolute'>
            <img src='https://assets.nflxext.com/ffe/siteui/vlv3/893a42ad-6a39-43c2-bbc1-a951ec64ed6d/1d86e0ac-428c-4dfa-9810-5251dbf446f8/IN-en-20231002-popsignuptwoweeks-perspective_alpha_website_large.jpg'
            alt='bg'/>
        </div>
        <form onSubmit={(e) => e.preventDefault()}className='bg-black w-3/12 p-12 absolute my-24 mx-auto right-0 left-0 text-white bg-opacity-80'> 
            
            <h1 
            className='text-white text-3xl py-2'>
                {isSignIn ? 'Sign In' : 'Sign Up'}</h1>
             
             {!isSignIn && (
            <input 
            ref={name}
            type='text' 
            placeholder='FullName' 
            className='w-full my-4 p-3 bg-gray-700'/>
             )}  

            <input 
            ref={email} 
            className='w-full my-4 p-3 bg-gray-700'
            type='text' 
            placeholder='Email or Phone Number' />

            <input  
            ref={password}
            className='w-full my-4 p-3 bg-gray-700'
            type='password' 
            placeholder='Password' />

            <button 
            className='w-full my-4 p-3 bg-red-700 border rounded-lg' onClick={handleButton}>
            {isSignIn ? 'Sign In' : 'Sign Up'}
            </button>
            <p className='font-bold text-red-700'>{errorMessage}</p>
            <p className='py-2 cursor-pointer' onClick={toggleSignIn} >
                {isSignIn ? "New to Netflix, sign up now!" : "Already a User, Sign In"}</p>
        </form>
    </div>
  )
}

export default Login