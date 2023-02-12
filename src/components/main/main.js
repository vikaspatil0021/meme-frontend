import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AuthModel from "../Auth/authModel";
import bgMain from "../img/bgMain.jpeg"
import "./main.css"



const Main = () => {
    const [auth, setAuth] = useState('');
    useEffect(() => {

        axios.get(process.env.REACT_APP_SERVER_URL + "/isauth", { withCredentials: "include" })
            .then((res) => {
                setAuth(res.data.isAuth)
            }).catch((err) => {
                console.log(err);
            })
    }, []);

    return (
        <div className="">
            <div className="bg-white px-2 py-2 border-bottom">
                <div className="d-flex ms-2 ms-md-3">
                    <div className="mx-auto" style={{ width: "1370px" }}>

                        {(auth) ? <a href="/dashboard" class="btn btn-primary me-1 rounded-4 opacity-75 px-3 fw-semibold">Dashboard</a> :
                            <button data-bs-toggle="modal" data-bs-target="#authModel" class="btn btn-primary me-1 rounded-4 opacity-75 px-3 fw-semibold">Dashboard</button>}
                        <a href="/memes" class="btn btn-primary rounded-4 opacity-75 px-3 fw-semibold me-1">Memes</a>

                        <a href="/people" class="btn btn-primary rounded-4 opacity-75 px-3 fw-semibold">People</a>
                    </div>

                </div>


            </div>
            <AuthModel />

            <div id="main-post-button" className="d-flex justify-content-md-center">

{(auth) ? <a href="/compose" className="btn btn-primary opacity-75 rounded-5 px-4 py-2 m-3 fs-4">
    Post a meme today!
</a> :
    <button data-bs-toggle="modal" data-bs-target="#authModel" class="btn btn-primary opacity-75 rounded-5 px-4 py-2 m-3 fs-4">
        Post a meme today!
    </button>}
</div>
            <div id="carouselControls-main" class="carousel slide">
                <div class="carousel-inner">
                    <div class="carousel-item active">


                        <div className=" m-3 mb-2 d-flex justify-content-md-center">
                            

                            <h1 className="fw-bolder text-muted mx-3 my-0">Top memes</h1>
                        </div>


                    </div>
                    <div class="carousel-item">


                    <div className=" m-3 d-flex justify-content-md-center">
                            

                            <h1 className="fw-bolder text-muted mx-3 my-0">Top people</h1>
                        </div>
                    </div>
                    <div className="fixed-bottom d-flex justify-content-center mb-3">
                        <button className="btn btn-primary rounded-5 rounded-end me-1" type="button" data-bs-target="#carouselControls-main" data-bs-slide="prev">
                            <i class="fs-4 bi bi-arrow-left" />

                        </button>
                        <button class="btn btn-primary rounded-5 rounded-start" type="button" data-bs-target="#carouselControls-main" data-bs-slide="next">
                            <i class="bi bi-arrow-right fs-4" />
                        </button>








                    </div>
                </div>
            </div>




        </div>
    )

}


export default Main;