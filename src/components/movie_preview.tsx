import "../styles/movie_preview.css";
import {useEffect, useState} from "react";
import StreamOptionsPopup from "./stream_options_popup.tsx";


interface Props {
    title: string;
    year: string;
    img: string;
    id: string;
    backdrop: string;
}

function MoviePreview(props: Props) {

    const [streamDetails, setStreamDetails] = useState<[{
        service: string,
        link: string,
        language: [{ language: string, region: string }]
    }]>([{service: 'default', link: '', language: [{language: '', region: ''}]}]);

    const [isLoading, setIsLoading] = useState(false);

    const [isClicked, setIsClicked] = useState(false);

    const [watchlist, setWatchlist] = useState(JSON.parse(localStorage.getItem('watchlist') || '[]'));

    const getMovie = (movie_id: string) => {
        const url = `https://streaming-availability.p.rapidapi.com/get?output_language=en&tmdb_id=movie%2F${movie_id}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '1d6e219e39mshc8c2a506d5675bap13ba8ejsnc9af2674602f',
                'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
            }
        };


        try {
            setIsLoading(true);
            fetch(url, options)
                .then(response => response.json()
                    .then((data) => {
                        console.log(`Movie ID: ${movie_id}`);
                        const temp_list: {
                            service: string,
                            link: string,
                            language: [{ language: string, region: string }]
                        }[] = [];

                        try {
                            for (let i = 0; i < data.result.streamingInfo.in.length; i++) {
                                console.log(`Streaming Service: ${data.result.streamingInfo.in[i].service}`);
                                console.log(`Streaming URL: ${data.result.streamingInfo.in[i].link}`);
                                temp_list.push(
                                    {
                                        service: data.result.streamingInfo.in[i].service,
                                        link: data.result.streamingInfo.in[i].link,
                                        language: data.result.streamingInfo.in[i].audios
                                    });
                            }

                        } catch (error) {
                            console.error(error);
                        }

                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        setStreamDetails(temp_list);
                        setIsLoading(false);
                        // console.log(`Streaming Service: ${data.result.streamingInfo.in[0].service}`);
                        // console.log(`Streaming URL: ${data.result.streamingInfo.in[0].link}`);
                        //   window.open(data.result.streamingInfo.in[0].link, '_blank');
                    }));

        } catch (error) {
            console.error(error);
        }
    }

    const getWatchlist = () => {
        const watchlist_json = JSON.parse(localStorage.getItem('watchlist') || '[]');
        const watchlist_ = [];

        for (let i = 0; i < watchlist_json.length; i++) {
            watchlist_.push({title: watchlist_json[i].title, year: watchlist_json[i].year, img: watchlist_json[i].img, id: watchlist_json[i].id});
        }

        setWatchlist(watchlist_);
    }

    useEffect(() => {
        getWatchlist();
    }, []);

    const updateWatchList = () => {

        console.log(`clicked_2`);

        const watchlist_json = JSON.parse(localStorage.getItem('watchlist') || '[]');
        const watchlist_ = [];

        console.log(`clicked_3`);


        for (let i = 0; i < watchlist_json.length; i++) {
            watchlist_.push({title: watchlist_json[i].title, year: watchlist_json[i].year, img: watchlist_json[i].img, id: watchlist_json[i].id});
        }

        console.log(`clicked_4`);

        if (watchlist_.some(obj => obj.id === props.id)) {
            for (let i = 0; i < watchlist_.length; i++) {
                if (watchlist_[i].id === props.id) {
                    watchlist_.splice(i, 1);
                }
            }
        } else {
            console.log(watchlist);
            watchlist_.push({title: props.title, year: props.year, img: props.img, id: props.id});
        }

        console.log(`clicked_5`);

        localStorage.setItem('watchlist', JSON.stringify(watchlist_));
        setWatchlist(watchlist_);

        console.log(`clicked_6`);

    }

    const [showTooltip, setShowTooltip] = useState(false);


    return (
        <div
             className="movie-container">
            <div>
                <img
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    src={props.img}
                    className="movie-img"
                    alt="movie"/>
                <div className="info-like-btn-container">
                    <div className="info-container">
                        <p className="movie-title">{props.title}</p>
                        <p className="movie-year">{props.year}</p>
                    </div>
                    <div className="like-btn-container">
                        <button
                            onClick={() => {
                                console.log(`Clicked`);
                                updateWatchList();
                            }}
                            className="like-btn">


                            {watchlist.some((obj: {
                                title: string,
                                year: string,
                                img: string,
                                id: string
                            }) => obj.id === props.id) ? "M" : "L"}
                        </button>
                    </div>
                </div>

                <div
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    className={`tooltip ${showTooltip ? "open" : ""}`}>

                    <div className="tooltip-page-1" style={isClicked ? {display: "none"} : {}}>
                        <img src={props.backdrop} className="tooltip-backdrop-img"/>
                        <p className="tooltip-title-txt">{props.title}</p>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <button
                                onClick={() => {
                                    if (streamDetails[0].service === 'default') {
                                        getMovie(props.id);
                                    }
                                    setIsClicked(true);
                                }}
                                className="watch-btn">
                                Watch Now
                            </button>

                            <button className="watch-btn">
                                L
                            </button>

                        </div>
                    </div>

                    <div
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                        className="tooltip-page-2" style={isClicked ? {} : {display: "none"}}>
                        <div style={{display: "flex", flexDirection: "row"}}>
                            <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                                <button
                                    style={{display: "flex", flexDirection: "column", justifyContent: "center"}}
                                    onClick={() => {
                                        setIsClicked(false);
                                    }}
                                    className="back-btn"><p style={{marginTop: "15px", marginLeft: "5px"}}>&lt;</p></button>
                            </div>

                            <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                                <p className="heading">{isLoading ? "Searching..." : streamDetails.length === 0 ? "No options available" : "Available Services"}</p>
                            </div>
                        </div>
                        {/* randon height is to ensure that the mouse is hovering over the whole region*/}
                        <div style={{height: "250px"}}>
                            <StreamOptionsPopup heading={"heading"} options={streamDetails}/>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default MoviePreview;