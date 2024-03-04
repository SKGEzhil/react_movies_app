import "../styles/navbar.css";
import SearchBar from "./search_bar.tsx";
import {NavLink, useNavigate} from "react-router-dom";
import {base_route} from "../App.tsx";
import {useMediaQuery} from "react-responsive";
import {createContext, useContext, useState} from "react";

export const NavbarContext = createContext({
    isMenuOpen: false, setIsMenuOpen: (value: boolean) => {console.log(value)}
});


function Navbar() {

    const isMobile = useMediaQuery({query: "(max-width: 600px)"});
    const isTablet = useMediaQuery({query: "(max-width: 1200px)"});
    // const isDesktop = useMediaQuery({query: "(min-width: 900px)"});

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navigate = useNavigate();

    return (
        <div className="navbar-container" style={isMenuOpen ? {height: "100%"} : {}}>

            <div
                onClick={() => {
                    navigate(`${base_route}/`);
                }}
                className="logo-title-container">

                <div className="logo-container">
                    <img
                        src="/react_movies_app/netflix.webp"
                        className="logo"
                        alt="logo"/>
                </div>

                <div className="title-container">
                    <p className="title-txt">
                        React Movies App
                    </p>
                </div>
            </div>

            {isTablet ?
                <div
                    onClick={() => {
                        setIsMenuOpen(!isMenuOpen);
                    }}
                    className="menu-container">
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>

                : ""}


            {isMobile ? <></> :
                isTablet ? <></> :
                    <SearchBar isTablet={false}/>}

            {isTablet ? <></> :
                <div className="navbar-items-container">
                <NavLink to={`${base_route}/`} className="navbar-item">Home</NavLink>
                <NavLink to={`${base_route}/movies`} className="navbar-item">Movies</NavLink>
                <NavLink to={`${base_route}/series`} className="navbar-item">Series</NavLink>
                <NavLink to={`${base_route}/watch_list`} className="navbar-item">MyList</NavLink>

            </div>}

            {isMenuOpen ?

                <NavbarContext.Provider value={{isMenuOpen, setIsMenuOpen}}>
                <MobileNav/>
                </NavbarContext.Provider>

                : <></>}


        </div>
    );
}

function MobileNav(){

    const {setIsMenuOpen} = useContext(NavbarContext);

    return(
        <>

            <div style={{position: "absolute", width: "100%", height: "100%", backgroundColor: "black"}}>
                <div style={{display: "flex", justifyContent: "flex-end"}}>
                    <button style={{backgroundColor: "transparent", border: "none", color: "white", fontSize: "30px", margin: "10px"}}
                        onClick={() => {
                            setIsMenuOpen(false);
                        }}
                    >X</button>
                </div>
                <div style={{margin: "10px"}}>
                    <SearchBar isTablet={true}/>
                </div>
                <div
                    onClick={() => {
                        setIsMenuOpen(false);
                    }}
                    style={{display: "flex",marginTop:"30px", flexDirection: "column", height: "100%", width: "100%",alignItems: "center",}}>
                    <NavLink to={`${base_route}/`} className="navbar-item"><p style={{fontSize: "30px"}}>Home</p></NavLink>
                    <NavLink to={`${base_route}/movies`} className="navbar-item"><p style={{fontSize: "30px"}}>Movies</p></NavLink>
                    <NavLink to={`${base_route}/series`} className="navbar-item"><p style={{fontSize: "30px"}}>Series</p></NavLink>
                    <NavLink to={`${base_route}/watch_list`} className="navbar-item"><p style={{fontSize: "30px"}}>My List</p></NavLink>
                </div>

            </div>

        </>
    )
}

export {MobileNav};
export default Navbar;