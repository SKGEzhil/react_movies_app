import '../styles/App.css'
import Navbar from "../components/navbar.tsx";
import MoviePreview from "../components/movie_preview.tsx";
import {Key, useContext, useEffect,} from "react";
import AppContext from "../app_context.tsx";
import MovieSlideshow from "../components/movie_slideshow.tsx";


function Home() {

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const {movies_list, update_list} = useContext(AppContext);

    // const {movies_list, update_list} = useGlobalState();
    const temp_list: { title: string; year: string; img: string; id: string; backdrop: string }[] = [];

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMDdlM2E4ZTUxZjZhMDMwNTMxZDczZmJiYjY4NWI5MSIsInN1YiI6IjY1ZGRhNjY1MjRiMzMzMDE0OWI2OTlmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VH0xtjML9N5XPROqAB3Z6mrR6glT2SYOXCwsDgqwgxU'
        }
    };

    const fetchMovies = () => {

            fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
                .then(response => response.json())
                .then(response => {
                    for (let i = 0; i < response.results.length; i++) {
                        const data = response.results[i];
                        temp_list.push(
                            {
                                title: data.title,
                                year: data.release_date,
                                img: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${data.poster_path}`,
                                id: data.id,
                                backdrop: `https://www.themoviedb.org/t/p/w1920_and_h1080_bestv2/${data.backdrop_path}`
                            }
                        );
                    }
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    update_list(temp_list);
                    localStorage.setItem('default_movies_list', JSON.stringify(temp_list));

                })
                .catch(err => console.error(err));

    }

    useEffect(() => {
        if(localStorage.getItem('default_movies_list') === null) {
            fetchMovies();
        } else {
            update_list(JSON.parse(localStorage.getItem('default_movies_list') || ''));
        }
    }, []);



    console.log(`MOVIES LIST: `)


    return (
        <>
            <div style={{position: "relative"}}>
                <Navbar/>
                <MovieSlideshow/>
            </div>



            <div className="movies-grid-container">
                {movies_list.map((movie: { title: string; year: string; img: string; id: string; }, index: Key | null | undefined) => {
                    return (
                        <MoviePreview
                            key={index}
                            title={movie.title}
                            year={movie.year}
                            img={movie.img}
                            id={movie.id}
                        />
                    )
                })}
            </div>


        </>
    )
}

export default Home
