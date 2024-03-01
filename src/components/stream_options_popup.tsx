import "../styles/stream_options_popup.css";

interface Props {
    heading: string;
    options: [{ service: string, link: string, language: [{ language: string, region: string }] }];
}

function StreamOptionsPopup(props: Props) {
    return (
        // <div className={"popup-container"}>
        //     <p className="heading">{props.heading}</p>
            <>
                <div className="link-btn-grid">

                    {props.options.map((option) => {

                        const image = option.service === "netflix" ? "/src/assets/netflix.webp" :
                            option.service === "prime" ? "/src/assets/prime.png" :
                                option.service === "zee5" ? "/src/assets/zee5.svg" :
                                    "/src/assets/film.png"

                        return (
                            <div>
                                <a href={option.link}
                                   className="text-decoration-none"
                                   target="_blank" rel="noreferrer">
                                    <div className="link-btn">
                                        <div style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            flexDirection: "column"
                                        }}>
                                            <img className="service-logo" src={image}/>
                                        </div>
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center"
                                        }}>
                                            <p className="service-txt">{option.service}</p>

                                            <div style={{display: "flex", width: "80px", flexWrap: "wrap"}}>
                                                {option.language.map((lang, index) => {
                                                    return (
                                                        <p key={index} className="audio-txt">{lang.language}</p>
                                                    )
                                                })}
                                            </div>
                                        </div>

                                    </div>

                                </a>
                            </div>

                        )

                    })}
                </div>

            </>

        // </div>
    );
}

export default StreamOptionsPopup;