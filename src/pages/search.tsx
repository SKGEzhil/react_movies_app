import Navbar from "../components/navbar.tsx";
import MoviePreview from "../components/movie_preview.tsx";
import AppContext from "../app_context.tsx";
import {useContext} from "react";
import "../styles/search.css";

function Search() {

    const {search_result_list} = useContext(AppContext);

    return (
        <>
            <Navbar/>
            <p className="search-title" style={{position: "relative", top: "82px", left: "20px"}}>{search_result_list.length !== 0 ? `Found ${search_result_list.length} movies` : "No movies found"}</p>
            <div style={{display: "grid",
                position: "relative",
                top: "102px",
                gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
                marginLeft: "10px",
                marginRight: "10px",
                gap: "10px"}}>
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