import React from 'react'
import { useSelector } from "react-redux"
import MovieList from './MovieList'

const SecondaryContainer = () => {
  const movies= useSelector(store => store.movies)
  return (
     (
      <div className='bg-black w-screen pl-8'>
      <div className=' -mt-52  relative z-20'>
      <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies}/>
      </div>
      <MovieList title={"Trending"} movies={movies.trendingMovies}/>
      <MovieList title={"Popular"} movies={movies.popularMovies} />
      <MovieList title={"Upcoming Movies"} movies={movies.upComingMovies}/>

    </div>
    )
  )
}

export default SecondaryContainer

/*
      MovieList-Popular
        -MovieCards*n
      MovieList- Now Playing
      MovieList-Trending
      MovieList- Horror Movies
  */