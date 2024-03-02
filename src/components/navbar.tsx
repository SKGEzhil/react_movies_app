import "../styles/navbar.css";
import SearchBar from "./search_bar.tsx";
import {NavLink, useNavigate} from "react-router-dom";
import {base_route} from "../App.tsx";


function Navbar() {


    const navigate = useNavigate();

    return (
        <div className="navbar-container">

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
                        Movies App
                    </p>
                </div>
            </div>

            <SearchBar/>
            <div className="navbar-items-container">
                <NavLink to={`${base_route}/`} className="navbar-item">Home</NavLink>
                <NavLink to={`${base_route}/movies`} className="navbar-item">Movies</NavLink>
                <NavLink to={`${base_route}/series`} className="navbar-item">Series</NavLink>
                <NavLink to={`${base_route}/watch_list`} className="navbar-item">MyList</NavLink>

            </div>


        </div>
    );
}

export default Navbar;