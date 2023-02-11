import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AuthModel from "../Auth/authModel";




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
        <div className="h-100">

            <div id="carouselControls-main" class="carousel slide h-100">
                <div class="carousel-inner h-100">
                    <div class="carousel-item active bg-white h-100">


                        {(auth) ? <a href="/compose" className="btn btn-primary opacity-75 rounded-5 px-4 my-4 py-3 fs-4">
                            Post a meme today!
                        </a> :
                            <a data-bs-toggle="modal" data-bs-target="#authModel" class="btn btn-primary opacity-75 rounded-5 px-4 my-4 py-3 fs-4">
                                Post a meme today!
                            </a>}
                        <AuthModel />

                    </div>
                    <div class="carousel-item">


                        {(auth) ? <a href="/compose" className="btn btn-primary opacity-75 rounded-5 px-4 my-4 py-3 fs-4">
                            Post a meme today!
                        </a> :
                            <a data-bs-toggle="modal" data-bs-target="#authModel" class="btn btn-primary opacity-75 rounded-5 px-4 my-4 py-3 fs-4">
                                Post a  today!
                            </a>}
                        <AuthModel />

                    </div>
                    <div className="fixed-bottom">

                    <button id="register-button" data-bs-target="#carouselControls-main" data-bs-slide="prev" class="btn btn-danger btn-lg w-100 rounded-4"
                          type="button">Prev

                    </button>
                    <button id="register-button" data-bs-target="#carouselControls-main" data-bs-slide="next" class="btn btn-danger btn-lg w-100 rounded-4"
                          type="button">Next

                    </button>
                    </div>







                </div>
            </div>



        </div>
    )

}


export default Main;