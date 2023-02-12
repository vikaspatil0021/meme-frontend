import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AuthModel from "../Auth/authModel";
import p1 from "../img/p1.png"
import Preloader from "../preLoader/preloader";
import "./main.css"



const Main = () => {
    const [auth, setAuth] = useState('');
    const [loading, setLoading] = useState(false);
    const [storiesData, setStoriesData] = useState([])

    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL + "/memes", { withCredentials: "include" })
            .then((res) => {
                console.log(res.data);
                setLoading(true)

                // const reverseArr = (res.data.storiesAll).reverse()

                setStoriesData(res.data.storiesAll);
                console.log(res.data.storiesAll);
                // setUser(res.data.fUser)
                // }
            }).catch((error) => {
                console.log(error);

            });
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
            {loading ? 
            (<>
            <div id="main-post-button" className="d-flex justify-content-md-center">

                {(auth) ? <a href="/compose" className="btn btn-primary opacity-75 rounded-5 px-4 py-2 m-3 fs-4">
                    Post a meme today!
                </a> :
                    <button data-bs-toggle="modal" data-bs-target="#authModel" class="btn btn-primary opacity-75 rounded-5 px-4 py-2 m-3 fs-4">
                        Post a meme today!
                    </button>}
            </div>
            
            <div className="d-flex">

                <div id="carouselControls-main" class="carousel slide mx-auto" style={{ width: "1370px" }}>
                    <div class="carousel-inner">
                        <div class="carousel-item active">


                            <div className=" mx-3 mt-3 d-flex justify-content-md-center">


                                <h1 className="fw-bolder text-muted mx-3 my-0">Top memes</h1>
                                <div class="" type="button" data-bs-target="#carouselControls-main" data-bs-slide="next">
                                    <i class="bi bi-arrow-right fs-1" />
                                </div>
                            </div>
                            <div className="mx-auto px-3 d-flex flex-wrap mw-100">
                            {storiesData.map((story) => {
                                return(
                                <div className="p-1 p-md-2 col-12 col-md-6 col-lg-4">

                                    <div class="card Storycard rounded-5 mb-1">
                                        <div class="card-content d-flex p-2">
                                            <div className="col-5">
                                                <img class=" rounded-5 cropped" src={story.imageURL} alt="Card image cap" height="120" width='130' />

                                            </div>
                                            <div class="card-body col-7 pt-2 text-dark">
                                                <h5 class="card-title fw-semibold" style={{ fontSize: "22px" }}>{story.title}</h5>
                                                
                                                <div className="card-content d-inline-flex flex-wrap rounded-3" style={{ backgroundColor: "#efefef" }}>


                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>)
                            })}

                                
                                
                            </div>



                        </div>
                        <div class="carousel-item">


                            <div className=" m-3 d-flex justify-content-md-center">


                                <h1 className="fw-bolder text-muted mx-3 my-0">Top people</h1>
                                <div class="" type="button" data-bs-target="#carouselControls-main" data-bs-slide="next">
                                    <i class="bi bi-arrow-right fs-1" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            </>) : <Preloader />}





        </div>
    )

}


export default Main;