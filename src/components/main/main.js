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


            <div id="carouselControls-main" class="carousel slide">
                <div class="carousel-inner">
                    <div class="carousel-item active">


                        <div className="d-flex justify-content-center">

                            <div className="card storyPage rounded-5 m-3 " style={{ width: "1370px" }}>

                                <div className="d-flex flex-wrap justify-content-between mx-3 mt-5 rounded-5">
                                    <div>

                                    <span className="text-muted  fw-bolder text-left ms-3 ms-md-5" style={{ fontSize: "50px" }}>Welcome to </span>
                                    <p className="text-dark fw-bolder text-left ms-3 ms-md-5" style={{ fontSize: "60px" }}>IMEME,</p>
                                    <p className="text-muted fw-bolder text-left ms-3 mb-0 ms-md-5" style={{ fontSize: "30px" }}>Ain't you the meme guy? </p>
                                    <p className="text-muted fw-bolder text-left ms-3 ms-md-5" style={{ fontSize: "30px" }}></p>


                                    </div>

                                    <div className="me-md-5 d-flex align-items-end">

                                {(auth) ? <a href="/compose" className="btn btn-primary opacity-75 ms-2 ms-md-5 rounded-5 px-4 mb-4 my-md-4 py-3 fs-4">
                                    Post a meme today!
                                </a> :
                                    <a data-bs-toggle="modal" data-bs-target="#authModel" class="btn btn-primary  ms-2 ms-md-5 opacity-75 rounded-5 px-4 mb-4 my-md-4 py-3 fs-4">
                                        Post a meme today!
                                    </a>}
                                    </div>
                                    {/* <div className="d-flex justify-content-center">

                                        <a type="button" href="/register" class="btn btn-danger rounded-5 my-2 fs-4 px-5" >Register</a>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <span className="text-center text-muted fs-5 me-1 mt-4">Alredy a member?</span>
                                        <a type="button" href="/login" class="btn btn-primary mt-3 rounded-5 my-2 fs-6 px-4">Login</a>
                                    </div> */}
                                </div>

                            </div>
                        </div>


                    </div>
                    <div class="carousel-item">


dfdhfg

                    </div>
                    <div className="fixed-bottom d-flex justify-content-center mb-3">
                        <button className="btn btn-primary rounded-5 rounded-end me-1" type="button" data-bs-target="#carouselControls-main" data-bs-slide="prev">
                            <i class="fs-4 bi bi-arrow-left" />

                        </button>
                        <button class="btn btn-primary rounded-5 rounded-start" type="button" data-bs-target="#carouselControls-main" data-bs-slide="next">
                            <i class="bi bi-arrow-right fs-4" />
                        </button>
                        {/* <button id="register-button" data-bs-target="#carouselControls-main" data-bs-slide="prev" class="btn btn-danger btn-lg w-100 rounded-4"
                            type="button">Prev

                        </button>
                        <button id="register-button" data-bs-target="#carouselControls-main" data-bs-slide="next" class="btn btn-danger btn-lg w-100 rounded-4"
                            type="button">Next

                        </button> */}







                    </div>
                </div>
            </div>




        </div>
    )

}


export default Main;