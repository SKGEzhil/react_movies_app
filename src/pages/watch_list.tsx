import Navbar from "../components/navbar.tsx";
import MoviePreview from "../components/movie_preview.tsx";
import {useContext} from "react";
import UserContext from "../user_context.tsx";

function WatchList() {

    const {username} = useContext(UserContext);

    const watchlist_json = JSON.parse(localStorage.getItem('watchlist') || '[]');
    const watchlist_ = [];

    for (let i = 0; i < watchlist_json.length; i++) {
        watchlist_.push({title: watchlist_json[i].title, year: watchlist_json[i].year, img: watchlist_json[i].img, id: watchlist_json[i].id, backdrop: watchlist_json[i].backdrop});
    }

    return (
        <>
            <Navbar/>

            {username !== '' ?
                <div>
                    <p className="search-title" style={{
                        fontSize: "32px",
                        color: "white",
                        position: "relative",
                        top: "82px",
                        left: "20px"
                    }}>My Watch List</p>
                    <div style={{
                        display: "grid",
                        position: "relative",
                        top: "102px",
                        gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
                        marginLeft: "10px",
                        marginRight: "10px",
                        gap: "10px"
                    }}>
                        {watchlist_.map((movie: {
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
                </div>

                : <p>Login back to continue</p>
            }


        </>
    );
}

export default WatchList;