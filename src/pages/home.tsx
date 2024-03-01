import '../styles/home.css'
import Navbar from "../components/navbar.tsx";
import {useContext, useEffect,} from "react";
import AppContext from "../app_context.tsx";
import MovieSlideshow from "../components/movie_slideshow.tsx";
import Slider from "../components/slider.tsx";



function Home() {

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const {movies_list, update_list, tv_list, update_tv_list} = useContext(AppContext);

    // const {movies_list, update_list} = useGlobalState();
    const temp_list: { title: string; year: string; img: string; id: string; backdrop: string }[] = [];

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMDdlM2E4ZTUxZjZhMDMwNTMxZDczZmJiYjY4NWI5MSIsInN1YiI6IjY1ZGRhNjY1MjRiMzMzMDE0OWI2OTlmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VH0xtjML9N5XPROqAB3Z6mrR6glT2SYOXCwsDgqwgxU'
        }
    };

    const fetchMovies = (url: string, isTv: boolean) => {

            fetch(url, options)
                .then(response => response.json())
                .then(response => {
                    for (let i = 0; i < response.results.length; i++) {
                        const data = response.results[i];

                        if (isTv){
                            temp_list.push(
                                {
                                    title: data.name,
                                    year: data.first_air_date,
                                    img: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${data.poster_path}`,
                                    id: data.id,
                                    backdrop: `https://www.themoviedb.org/t/p/w1920_and_h1080_bestv2/${data.backdrop_path}`
                                }
                            );
                        } else{
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

                    }
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    if(!isTv) {
                        update_list(temp_list);
                        localStorage.setItem('default_movies_list', JSON.stringify(temp_list));
                    } else {
                        update_tv_list(temp_list);
                        localStorage.setItem('default_tv_list', JSON.stringify(temp_list));
                    }


                })
                .catch(err => console.error(err));

    }

    useEffect(() => {
        if(localStorage.getItem('default_movies_list') === null) {
            fetchMovies("https://api.themoviedb.org/3/trending/movie/day?language=en-US", false);
        } else {
            update_list(JSON.parse(localStorage.getItem('default_movies_list') || ''));
        }

        if(localStorage.getItem('default_tv_list') === null) {
            fetchMovies("https://api.themoviedb.org/3/trending/tv/day?language=en-US", true);
        } else {
            update_tv_list(JSON.parse(localStorage.getItem('default_tv_list') || ''));
        }

    }, []);

    console.log(`MOVIES LIST: `)


    return (
        <>
            <div className="home">

                <div style={{position: "relative"}}>
                    <Navbar/>
                    <MovieSlideshow/>
                </div>

                <div className="gradient">

                </div>


                <div className="movies-grid-container" style={{
                    position: "relative",
                    top: "550px",
                    zIndex: 20
                }} >

                    <Slider data={movies_list} sliderTitle={"Popular Movies"}/>
                    <div className="padding"></div>
                    <Slider data={tv_list} sliderTitle={"TV Shows"}/>


                    {/*{movies_list.map((movie: {*/}
                    {/*    title: string;*/}
                    {/*    year: string;*/}
                    {/*    img: string;*/}
                    {/*    id: string;*/}
                    {/*}, index: Key | null | undefined) => {*/}
                    {/*    return (*/}
                    {/*        <MoviePreview*/}
                    {/*            key={index}*/}
                    {/*            title={movie.title}*/}
                    {/*            year={movie.year}*/}
                    {/*            img={movie.img}*/}
                    {/*            id={movie.id}*/}
                    {/*        />*/}
                    {/*    )*/}
                    {/*})}*/}
                </div>

            </div>


        </>
    )
}

export default Home
