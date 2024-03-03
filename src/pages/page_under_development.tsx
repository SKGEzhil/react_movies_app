import Navbar from "../components/navbar.tsx";

function PageUnderDevelopment() {
    return (
        <>
          <Navbar/>
            <p style={{
                position: "relative",
                top: "100px",
                fontSize: "40px",
                marginLeft: "20px",
                color: "rgba(255,255,255,0.79)"
            }}>This page is still under development...</p>
        </>

    );
}

export default PageUnderDevelopment;