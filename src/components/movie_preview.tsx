import "../styles/movie_preview.css";
import * as React from "react";
import {useEffect, useState} from "react";
import StreamOptionsPopup from "./stream_options_popup.tsx";
import {Popper} from '@mui/base/Popper';


interface Props {
    title: string;
    year: string;
    img: string;
    id: string;
}

function MoviePreview(props: Props) {


    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
        if (streamDetails[0].service === 'default') {
            getMovie(props.id);
        }
    };


    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;


    const [streamDetails, setStreamDetails] = useState<[{
        service: string,
        link: string,
        language: [{ language: string, region: string }]
    }]>([{service: 'default', link: '', language: [{language: '', region: ''}]}]);

    const [isLoading, setIsLoading] = useState(false);

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

    return (
        <div className="movie-container">
            <div>
                <img
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


                            {watchlist.some((obj: {title: string, year:string, img:string, id:string}) => obj.id === props.id) ? "M" : "L"}
                        </button>
                    </div>
                </div>

                <button className="watch-btn" onClick={handleClick}>
                    Watch Now
                </button>
                <Popper id={id} open={open} anchorEl={anchorEl} placement={"top-end"}>
                    <StreamOptionsPopup
                        heading={isLoading ? "Searching for options..." : streamDetails.length === 0 ? "No options available" : "Available Streaming Services"}
                        options={streamDetails}/>
                </Popper>

            </div>

        </div>
    );
}

export default MoviePreview;