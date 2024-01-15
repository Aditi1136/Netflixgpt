import React, { useRef } from 'react'
import lang from '../utils/languageConstants'
import { useDispatch, useSelector } from 'react-redux'
import openai from '../utils/openAI'
import { API_OPTIONS } from '../utils/constants'
import { addGPTResults } from '../utils/gptSlice'




const GptSearchBar = () => {
  const dispatch = useDispatch()
  const languageKey = useSelector(store=> store.config.lang)
  const searchText = useRef(null);
  //search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
     API_OPTIONS
     )

     const json = await data.json();
     return json.results;
     
  }

  const handleGPTSearchClick = async() =>{
    console.log(searchText.current.value)
    //Make an API call to GPT API and get Movie Results

    const gptQuery = 
    "Act as a Movie Reccomendation system and  suggest some movies for the query" + 
    searchText.current.value + 
    "Only give me top 5 movies, comma sperated like the example result given ahead Example Result : Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: 'user', content: gptQuery}],
      model: 'gpt-3.5-turbo',
    });

    console.log (gptResults.choices?.[0]?.message?.content)

    const gptMovies =gptResults.choices?.[0]?.message?.content.split(",");
    
    //Now for each movies, We will search TMDB API and extract the movie details

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie)) 
    //console.log(promiseArray)
    // [Promise,Promise,Promise,Promise,Promise ]  it will give 5 promises, which will delay

    const searchedMovieResults = await Promise.all(promiseArray); 
    console.log(searchedMovieResults);

    dispatch(addGPTResults({movieNames: gptMovies, movieResults: searchedMovieResults})) 
    
    //This means when all the promises will be resolved then we will get the tmdbResults
}

  

  return (
    <div className='flex justify-center pt-[35%] md:pt-[10%]'>
        <form 
        className=' bg-black w-full md:w-1/2 grid grid-cols-12' 
        onSubmit={(e) => e.preventDefault()}>
            <input 
            ref={searchText}
            type='text' 
            className='p-4 m-4 col-span-9' 
            placeholder= {lang[languageKey].gptSearchPlaceholder}
           />
            <button 
            className='py-2 px-4 m-4 bg-red-700 text-white rounded-lg col-span-3'
            onClick={handleGPTSearchClick}
            >{lang[languageKey].search}
            </button>
        </form>
    </div>
  )
}

export default GptSearchBar