import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { BG_IMG } from '../utils/constants'

const Bar = () => {
  return (
    //GPT Search Bar
    //GPT Movie Suggestion
    <div>
         <div className='fixed -z-10'>
            <img src= {BG_IMG}
            alt='bg'/>
        </div>
       <GptSearchBar/>
       <GptMovieSuggestions/> 
    </div>
  )
}

export default Bar