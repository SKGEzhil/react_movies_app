import "../styles/navbar.css";
import SearchBar from "./search_bar.tsx";


function Navbar() {



    return (
        <div className="navbar-container">

            <div className="logo-title-container">
                <div className="logo-container">
                    <img
                        src="/src/assets/netflix.webp"
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
                <a href="#" className="navbar-item">Home</a>
                <a href="#" className="navbar-item">Movies</a>
                <a href="#" className="navbar-item">Series</a>
                <a href="#" className="navbar-item">My List</a>
            </div>


        </div>
    );
}

export default Navbar;