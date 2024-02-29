import { useState, useEffect } from "react";

export const useFetchMovies = (url: string) => {
    const [data, setData] = useState(null);
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMDdlM2E4ZTUxZjZhMDMwNTMxZDczZmJiYjY4NWI5MSIsInN1YiI6IjY1ZGRhNjY1MjRiMzMzMDE0OWI2OTlmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VH0xtjML9N5XPROqAB3Z6mrR6glT2SYOXCwsDgqwgxU'
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(url, options);
            const json = await response.json();
            setData(json);
        };
        fetchData();
    }, [url]);
    return { data };
};