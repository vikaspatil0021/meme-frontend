import React from "react";
import "./preLoader.css";
const Preloader = () => {
    const refreshAgain = () =>{
        window.location.reload();

    }
    return (
        <div className="pt-5">
            <div class="loader mx-auto"></div>

            <div className="my-auto d-flex justify-content-center pt-3" id="refresh-button" style={{ visibility: "hidden" }}>

                <button onClick={refreshAgain} className="btn btn-dark rounded-4 fs-5  px-3">Refresh again</button>
            </div>
        </div>
    )
}


export default Preloader;