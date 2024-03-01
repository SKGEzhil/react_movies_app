import Carousel from 'react-bootstrap/Carousel';
import AppContext from "../app_context.tsx";
import {useContext} from "react";

function MovieSlideshow() {


    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const {movies_list} = useContext(AppContext);

    return (
        <div style={{position: "absolute", width:"100%", zIndex:0}}>
            <Carousel indicators={false}>
                {
                    movies_list.map((movie: { title: string; year: string; img: string; id: string; backdrop: string }) => {
                        return (
                            <Carousel.Item interval={3000} key={movie.id}>
                                <img className="d-block w-100 object-fit-cover image" style={{height: "700px"}} src={movie.backdrop}/>
                                <Carousel.Caption style={{marginBottom: "150px"}}>
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