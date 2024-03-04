import Navbar from "../components/navbar.tsx";
import MoviePreview from "../components/movie_preview.tsx";
import AppContext from "../app_context.tsx";
import {useContext} from "react";
import "../styles/search.css";
import {useMediaQuery} from "react-responsive";

function Search() {

    const {search_result_list} = useContext(AppContext);

    const isMobile = useMediaQuery({query: "(max-width: 600px)"});
    const isTablet = useMediaQuery({query: "(max-width: 1200px)"});

    return (
        <>
            <Navbar/>
            <p className="search-title" style={{position: "relative", top: "82px", left: "20px"}}>{search_result_list.length !== 0 ? `Found ${search_result_list.length} movies` : "No movies found"}</p>
            <div
                className={isMobile ? "grid-3" : isTablet ? "grid-5" : "grid-8"}
                style={{
                    position: "relative",
                    top: "102px",
                    marginLeft: "10px",
                    marginRight: "10px"
                }}>
                {search_result_list.map((movie: {
                    title: string;
                    year: string;
                    img: string;
                    id: string;
                    backdrop: string
                }, index: number) => {
                    return (
                        <MoviePreview
                            key={index}
                            title={movie.title}
                            year={movie.year}
                            img={movie.img}
                            id={movie.id}
                            backdrop={movie.backdrop}/>
                    )

                })}
            </div>

        </>
    );
}

export default Search;