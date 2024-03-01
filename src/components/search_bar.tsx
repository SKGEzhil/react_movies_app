import "../styles/search_bar.css";
import {ChangeEvent, useContext, useState} from "react";
import AppContext from "../app_context.tsx";

function SearchBar() {

    const [inputText, setInputText] = useState("");
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const {update_list} = useContext(AppContext);

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMDdlM2E4ZTUxZjZhMDMwNTMxZDczZmJiYjY4NWI5MSIsInN1YiI6IjY1ZGRhNjY1MjRiMzMzMDE0OWI2OTlmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VH0xtjML9N5XPROqAB3Z6mrR6glT2SYOXCwsDgqwgxU'
        }
    };

    const temp_list: { title: string; year: string; img: string; id: string }[] = [];

    const fetchSearchResults = (query: string) => {
        fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=true&language=en-US&page=1`, options)
            .then(response => response.json())
            .then(response => {
                for (let i = 0; i < response.results.length; i++) {
                    const data = response.results[i];
                    temp_list.push(
                        {
                            title: data.title,
                            year: data.release_date,
                            img: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${data.poster_path}`,
                            id: data.id

                        }
                    );
                }
                update_list(temp_list);
            })
            .catch(err => console.error(err));
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        // Store the input value to local state
        setInputText(e.target.value);
        console.log(`Input: ${inputText}`);

        if(e.target.value !== "") {
            fetchSearchResults(e.target.value);
        } else {
            update_list(JSON.parse(localStorage.getItem('default_movies_list') || ''));
        }

        // for (let i = 0; i < searchResults.length; i++){
        //     console.log(`Result: ${searchResults[i].title}`);
        // }

    };

    return (
        <div>
            <input type="text" placeholder="Search" className="search-bar"/>
        </div>
    );
}

export default SearchBar;