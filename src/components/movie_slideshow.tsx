import Carousel from 'react-bootstrap/Carousel';
import AppContext from "../app_context.tsx";
import {useContext} from "react";

function MovieSlideshow() {

    const {movies_list} = useContext(AppContext);

    return (
        <div>
            <Carousel>
                {
                    movies_list.map((movie: { title: string; year: string; img: string; id: string; backdrop: string }) => {
                        return (
                            <Carousel.Item interval={3000} key={movie.id}>
                                <img className="d-block w-100 object-fit-cover" style={{height: "550px"}} src={movie.backdrop}/>
                                <Carousel.Caption>
                                    <h3>{movie.title}</h3>
                                    <p>{movie.year}</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        );
                    })
                }
            </Carousel>
        </div>

    );
}

export default MovieSlideshow;