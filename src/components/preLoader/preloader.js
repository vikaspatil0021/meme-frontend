import React from "react";
import "./preLoader.css";
const Preloader = (props) => {
    return (
        <div className=" mt-5 pt-5">
            <div class="loader mx-auto"></div>

            <div className="my-auto d-flex justify-content-center pt-3" id="refresh-button" style={{ visibility: "hidden" }}>

                <a href={"/"+props.page} className="btn btn-dark rounded-4 fs-5  px-3">Refresh again</a>
            </div>
        </div>
    )
}


export default Preloader;