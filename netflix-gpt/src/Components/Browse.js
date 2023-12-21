import { useSelector } from 'react-redux';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import usePopularMovies from '../hooks/usePopularMovies';
import useTrendingMovies from '../hooks/useTrendingMovies';
import useUpcomingMovies from '../hooks/useUpComingMovies';
import GptSearch from './GptSearch';
import Header from './Header'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';

const Browse = () => {
  const showGptSearch = useSelector(store => store.gpt.showGptSearch)
  useNowPlayingMovies();
  usePopularMovies();
  useTrendingMovies();
  useUpcomingMovies()
  return (
    <div>
         <Header/>
         {showGptSearch ?  (<GptSearch/>) :
         (
          <>
           <MainContainer/>
         <SecondaryContainer/>
          </>
         )
         }
         
        
         {/*
          MainContainer
            -VideoBackground
            -VideoTitle
          SecondaryContainer
            -MovieList * n
            -Cards * n
         */}
    </div>
 
  )
}

export default Browse