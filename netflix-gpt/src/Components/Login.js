import React, { useState } from 'react'
import Header from './Header'

const Login = () => {
    const [isSignIn,setIsSignIn] = useState(true)

    const toggleSignIn = () =>{
        return (
            setIsSignIn (!isSignIn)
          
        )
    }

  return (
    <div>
        <Header/>
        <div className='absolute'>
            <img src='https://assets.nflxext.com/ffe/siteui/vlv3/893a42ad-6a39-43c2-bbc1-a951ec64ed6d/1d86e0ac-428c-4dfa-9810-5251dbf446f8/IN-en-20231002-popsignuptwoweeks-perspective_alpha_website_large.jpg'
            alt='bg'/>
        </div>
        <form className='bg-black w-3/12 p-12 absolute my-24 mx-auto right-0 left-0 text-white bg-opacity-80'> 
            <h1 className='text-white text-3xl py-2'>
                {isSignIn ? 'Sign In' : 'Sign Up'}</h1>
             {!isSignIn && (
                <input type='text' placeholder='FullName' className='w-full my-4 p-3 bg-gray-700'/>
             )}   
            <input  className='w-full my-4 p-3 bg-gray-700'type='text' placeholder='Email or Phone Number' />
            <input  className='w-full my-4 p-3 bg-gray-700'type='password' placeholder='Password' />
            <button className='w-full my-4 p-3 bg-red-700 border rounded-lg'>
            {isSignIn ? 'Sign In' : 'Sign Up'}
            </button>
            <p className='py-2' onClick={toggleSignIn} >
                {isSignIn ? "New to Netflix, sign up now!" : "Already a User, Sign In"}</p>
        </form>
    </div>
  )
}

export default Login