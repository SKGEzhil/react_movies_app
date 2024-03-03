
import Navbar from "../components/navbar.tsx";

function ErrorPage() {


    return (
        <div>

            <Navbar/>
            <p style={{position:"relative", top: "100px", fontSize: "40px",marginLeft: "20px" ,color: "rgba(255,68,68,0.79)"}}>404 Page Not Found!!</p>

        </div>
    );
}

export default ErrorPage;