import { useRef, useState } from "react";
import "../styles/slider.css";
import MoviePreview from "./movie_preview.tsx";

interface Props {
    data: [{title: string, year: string, img: string, id: string, backdrop: string}];
    sliderTitle: string;
}

const Slider = (props: Props) => {
    const elementRef = useRef(null);
    const [arrowDisable, setArrowDisable] = useState(true);


    const handleHorizantalScroll = (element: { scrollLeft: number; } | null, speed: number | undefined, distance: number, step: number) => {
        let scrollAmount = 0;
        const slideTimer = setInterval(() => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            element.scrollLeft += step;
            scrollAmount += Math.abs(step);
            if (scrollAmount >= distance) {
                clearInterval(slideTimer);
            }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            if (element.scrollLeft === 0) {
                setArrowDisable(true);
            } else {
                setArrowDisable(false);
            }
        }, speed);
    };

    return (
        <>
            <div style={{position: "relative"}}>
                <div className="slider-title">
                    <h2>{props.sliderTitle}</h2>
                </div>
                <div className="button-contianer" style={{zIndex: 40, position: "absolute", top: "35%", width: "100%"}}>
                    <button
                        className="arrow-btn"
                        style={{position: "absolute", left: "0", zIndex: 100, marginLeft: "10px"}}
                        onClick={() => {
                            handleHorizantalScroll(elementRef.current, 3.5, 800, -10);
                        }}
                        disabled={arrowDisable}
                    >
                        &lt;
                    </button>
                    <div ></div>
                    <button
                        className="arrow-btn"
                        style={{position: "absolute", right: "0", zIndex: 100, marginRight: "10px"}}
                        onClick={() => {
                            handleHorizantalScroll(elementRef.current, 3.5, 800, 10);
                        }}
                    >
                        &gt;
                    </button>
                </div>
                <div className="img-container" ref={elementRef} style={{zIndex: 100}}>
                    {props.data.map((item) => (
                        <MoviePreview title={item.title} year={item.year} img={item.img} id={item.id}/>
                    ))}
                </div>
            </div>

        </>
    );
};
export default Slider;
