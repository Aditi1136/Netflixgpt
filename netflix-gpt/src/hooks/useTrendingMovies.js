import { useDispatch } from "react-redux";
import { addTrendingMovies } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";

const useTrendingMovies = () => {
    //Fetch data from TMDB API and update store. For this let us create a custom hook
  const dispatch = useDispatch();

  const getTrendingMovies = async () =>{
    const data = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', API_OPTIONS);
    const json = await data.json();
    console.log(json)
    dispatch(addTrendingMovies(json.results))
  }

  useEffect(()=>{
    getTrendingMovies();
  },[])
}

export default useTrendingMovies