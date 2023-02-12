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
            <div className="mx-3 mt-3 d-flex justify-content-center">


                <h1 className="fw-bolder text-muted mx-3 my-0" style={{ fontSize: "30px" }}>TRENDING</h1>

            </div>
            <div className="d-flex">

                <div class="mx-auto mt-2" style={{ width: "1370px" }}>
                <div className="d-flex justify-content-center ps-2 ps-md-3">


                    <div class="nav-pills p-2 pt-0 list-group list-group-horizontal" id="pills-main" role="tablist" >
                        <button class="active list-group-item opacity-75 rounded-4 me-2" id="pills-account-tab" data-bs-toggle="pill" data-bs-target="#main-memes" type="button" role="tab" aria-selected="true">Memes</button>
                        <button class="list-group-item opacity-75 rounded-4 me-2" id="pills-mystories-tab" data-bs-toggle="pill" data-bs-target="#main-people" type="button" role="tab" aria-selected="false">People</button>
                    </div>
                </div>
                </div>
            </div>

            <AuthModel />
            {loading ?
                (<>


                    <div className="d-flex">

                        <div class="mx-auto" style={{ width: "1370px" }}>

                            <div class="tab-content pb-2 px-0" id="pills-tabContent">
                                <div class="tab-pane fade show active" id="main-memes" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">



                                        <div className="mx-auto px-3 d-flex flex-wrap mw-100">
                                            {storiesData.map((story) => {
                                                return (
                                                    <div className="p-2 pb-0 col-12 col-md-6 col-lg-4">
                                                    <a href={"/memes/" + story._id} class="card-link">

                                                        <div class="card Storycard rounded-5">
                                                            <div class="card-content d-flex p-2">
                                                                <div className="col-4">
                                                                    <img class=" rounded-5 cropped" src={story.imageURL} alt="Card image cap" height="100" width='120' />

                                                                </div>
                                                                <div class="card-body col-8 p-2 ps-3 text-dark">
                                                                    <h5 class="card-title fw-semibold opacity-75" style={{ fontSize: "22px" }}>{story.title}</h5>

                                                                    <div className="card-content d-inline-flex flex-wrap rounded-3" style={{ backgroundColor: "#efefef" }}>


                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                        </a>
                                                    </div>)
                                            })}



                                        </div>

                                    <div className="position-fixed w-100 bottom-0 my-3">
                                    <div className="d-flex justify-content-center">

                                        <a href="/memes" className="btn btn-primary fs-4 py-2 ms-2 rounded-4">Explore memes
                                        <i className="bi bi-arrow-right fs-4 mx-2" />
                                        </a>
                                    </div>

                                    </div>

                                </div>

                            <div class="tab-pane fade" id="main-people" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
                                people
                            </div>
                            </div>

                        </div>

                    </div>
                </>) : <Preloader />}





        </div>
    )

}


export default Main;