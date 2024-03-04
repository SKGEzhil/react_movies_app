import "../styles/search_bar.css";
import {ChangeEvent, useContext, useState} from "react";
import AppContext from "../app_context.tsx";
import {base_route} from "../App.tsx";
import {useNavigate} from "react-router-dom";
import {NavbarContext} from "./navbar.tsx";

function SearchBar(props: {isTablet: boolean}) {

    const [inputText, setInputText] = useState("");
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    const {update_search_result_list} = useContext(AppContext);

    const {setIsMenuOpen} = useContext(NavbarContext);

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMDdlM2E4ZTUxZjZhMDMwNTMxZDczZmJiYjY4NWI5MSIsInN1YiI6IjY1ZGRhNjY1MjRiMzMzMDE0OWI2OTlmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VH0xtjML9N5XPROqAB3Z6mrR6glT2SYOXCwsDgqwgxU'
        }
    };

    const temp_list: { title: string; year: string; img: string; id: string, backdrop: string }[] = [];

    const fetchSearchResults = (query: string) => {
        fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=true&language=en-US&page=1`, options)
            .then(response => response.json())
            .then(response => {
                console.log("Search Results: 1");
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
                    console.log("Search Results: 2");
                }
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                update_search_result_list(temp_list);
            })
            .catch(err => console.error(err));
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        // Store the input value to local state
        setInputText(e.target.value);
        console.log(`Input: ${inputText}`);
    };

    const navigate = useNavigate();

    return (
        <div style={{display: "flex"}}>
            <input type="text"
                   style={props.isTablet ? {width: "100%"} : {width: "500px"}}
                   onChange={handleChange}
                   onKeyDown={(e) => {
                       if (e.key === "Enter")
                       {
                           if (inputText !== "") {
                               console.log("fetching search results")
                               navigate(`${base_route}/search`);
                               fetchSearchResults(inputText);
                               console.log("fetched search results")
                           }
                       }
                   }}
                   placeholder="Search"
                   className="search-bar"/>

                <button className="search-btn text-decoration-none" onClick={() => {

                    setIsMenuOpen(false);

                    if (inputText !== "") {
                        console.log("fetching search results")
                        navigate(`${base_route}/search`);
                        fetchSearchResults(inputText);
                        console.log("fetched search results")
                    }
                }}>
                    Search
                </button>
            {/*</NavLink>*/}
        </div>
    );
}

export default SearchBar;