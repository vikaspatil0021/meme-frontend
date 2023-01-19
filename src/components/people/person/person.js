import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Nav from "../../Header/header";
import Preloader from "../../preLoader/preloader";
import AuthModel from "../../Auth/authModel";
import "./person.css"


const Person = () => {
    const location = useLocation()
    const [personInfo, setPersonInfo] = useState({ story: {}, user: {}, sessionUser: {} });

    const [auth, setAuth] = useState('');
    const [loading, setLoading] = useState(false);
    console.log(personInfo);
    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL + location.pathname, { withCredentials: "include" })
            .then((res) => {
                setPersonInfo(res.data.foundUser);
                setLoading(true);

            }).catch((error) => {
                console.log(error);

            })

        axios.get(process.env.REACT_APP_SERVER_URL + "/isauth", { withCredentials: "include" })
            .then((res) => {
                setAuth(res.data.isAuth)
            }).catch((err) => {
                console.log(err);
            })

    }, []);

    const { username, name } = personInfo;

    return (
        <div>
            <AuthModel />
            <div className="sticky-top" >

                <div className=" bg-white quickLinks px-2 py-2">
                    <div className="d-flex ms-2 ms-md-3">
                        <div className="mx-auto" style={{ width: "1370px" }}>

                            <a href="/" class="btn btn-primary me-1 rounded-4 opacity-75 px-3 fw-semibold"><i class=" my-1 bi bi-house-door" /></a>
                            {(auth) ? <a href="/dashboard" class="btn btn-primary me-1 rounded-4 opacity-75 px-3 fw-semibold">Dashboard</a> :
                                <button data-bs-toggle="modal" data-bs-target="#authModel" class="btn btn-primary me-1 rounded-4 opacity-75 px-3 fw-semibold">Dashboard</button>}
                            <a href="/people" class="btn btn-primary rounded-4 opacity-75 px-3 fw-semibold"><i class="my-1 pe-1 bi bi-arrow-left" />People</a>

                        </div>

                    </div>
                </div>
            </div>
            {loading ?
                (
                    <div className="personPage">

                        <div className="border-bottom bg-white">
                            <div className="d-flex ms-2 ms-md-3">
                                <div className="d-flex justify-content-left mx-auto card-content" style={{ width: "1370px" }}>
                                    <div className="p-3 ps-2">

                                        <img class="rounded-5 cropped" src="https://res.cloudinary.com/dt55mivpf/image/upload/v1671421250/MYBLOG/POSTS/y8firp0fwrq4nicvrjw3.jpg" alt="Card image cap" height="150" width="150" />
                                    </div>

                                    <div className="m-auto ms-2 mt-4 ms-md-4">

                                        <h2 className="fw-semibold text-dark">{name}</h2>
                                        <h4 className="text-muted">({username})</h4>
                                    </div>




                                </div>

                            </div>

                        </div>

                        <div className="d-flex ">
                            <div className="py-4 ps-4 ps-md-4 mx-auto" style={{ width: "1370px" }}>

                                <div class="nav-pills mb-4 list-group list-group-horizontal" id="pills-tab" role="tablist" >
                                    <button class="active list-group-item opacity-75 rounded-4 me-2" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="true">Profile</button>
                                    <button class="list-group-item opacity-75 me-2 rounded-4" id="pills-friends-tab" data-bs-toggle="pill" data-bs-target="#pills-friends" type="button" role="tab" aria-controls="pills-friends" aria-selected="false">Friends(20)</button>
                                    <button class="list-group-item opacity-75 rounded-4" id="pills-stories-tab" data-bs-toggle="pill" data-bs-target="#pills-stories" type="button" role="tab" aria-controls="pills-stories" aria-selected="true">Stories(20)</button>



                                </div>
                                <div class="tab-content" id="pills-tabContent">
                                    <div class="tab-pane fade show active" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0">


                                        yes
                                    </div>
                                    <div class="tab-pane fade" id="pills-friends" role="tabpanel" aria-labelledby="pills-friends-tab" tabindex="0">
                                        friennds
                                    </div>
                                    <div class="tab-pane fade" id="pills-stories" role="tabpanel" aria-labelledby="pills-stories-tab" tabindex="0">
                                        stories
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                ) : <Preloader />}

        </div>
    );
}


export default Person;