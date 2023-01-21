import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Preloader from "../preLoader/preloader";



const Dashboard = (props) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [accountStories, setAccountStories] = useState({
        myAccount: {},
        myStories: []
    })

    //--------------Current Auth status----------
    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL + "/isauth", { withCredentials: "include" })
            .then((res) => {
                setLoading(res.data.isAuth);
                if (!(res.data.isAuth)) {
                    navigate("/login");
                }
            }).catch((err) => {
                console.log(err);
            });

        axios.get(process.env.REACT_APP_SERVER_URL + "/dash", { withCredentials: "include" })
            .then((res) => {
                console.log(res.data);
                setAccountStories(res.data);
            }).catch((error) => {
                console.log(error);

            });
    }, [])

    const deleteStory = async (storyId) => {
        await axios.delete(process.env.REACT_APP_SERVER_URL + "/delete", { data: { Id: storyId }, withCredentials: "include" })
            .then((res) => {
                console.log(res.data);
            }).catch((err) => {
                console.log(err);
            });

    }

    return (
        <div>
            <div className="bg-white px-2 py-2">
                <div className=" d-flex ms-2 ms-md-3">
                    <div className=" mx-auto" style={{ width: "1370px" }}>

                        <a href="/" class="btn btn-primary me-1 rounded-4 opacity-75 px-3 fw-semibold"><i class=" my-1 bi bi-house-door" /></a>
                        <a href="/stories" class="btn btn-primary rounded-4 opacity-75 px-3 fw-semibold me-1">Stories</a>

                        <a href="/people" class="btn btn-primary rounded-4 opacity-75 px-3 fw-semibold">People</a>
                    </div>

                </div>


            </div>
            <div className="sticky-top bg-white border-top">


                <div className="d-flex">
                    <div className="d-flex flex-wrap justify-content-between py-3 mx-auto px-3" style={{ width: "1390px" }}>
                        <h1 className="fw-bolder fs-2 my-auto ms-1 ms-md-2">
                            Dashboard
                        </h1>
                        {(loading) ?
                            <div className="my-auto">
                                <a href="/compose" class="btn btn-primary me-1 rounded-4 opacity-75">Compose</a>
                                <a href="https://my-blog-backend-1ict.onrender.com/logout" class="btn btn-danger rounded-4 me-2 me-md-4">Log out</a>
                            </div> : null}
                    </div>
                </div>
                {(loading) ?
                    <div className="d-flex ps-2 ps-md-3 quickLinks">

                        <div class="nav-pills p-2 list-group list-group-horizontal mx-auto" id="pills-tab" role="tablist" style={{ width: "1370px" }}>
                            <button class="active list-group-item opacity-75 rounded-4 me-2" id="pills-account-tab" data-bs-toggle="pill" data-bs-target="#pills-account" type="button" role="tab" aria-controls="pills-account" aria-selected="true">Account</button>
                            <button class="list-group-item opacity-75 rounded-4 me-2" id="pills-mystories-tab" data-bs-toggle="pill" data-bs-target="#pills-mystories" type="button" role="tab" aria-controls="pills-mystories" aria-selected="true">My Stories</button>
                            <button class="list-group-item opacity-75 me-2 rounded-4" id="pills-myfriends-tab" data-bs-toggle="pill" data-bs-target="#pills-myfriends" type="button" role="tab" aria-controls="pills-myfriends" aria-selected="false">My Friends</button>



                        </div>
                    </div> : null}

            </div>

            {loading ?
                (<div className="d-flex">





                    <div class="mx-auto px-2" style={{ width: "1370px" }}>

                        <div class="tab-content py-3 px-0" id="v-pills-tabContent">
                            <div class="tab-pane fade show active" id="pills-account" role="tabpanel" aria-labelledby="v-pills-home-tab" tabindex="0">
                                <div class="card mb-2">
                                    <h2 className="card-title px-4 pt-4">Account info</h2>
                                    <div class="card-body p-4">
                                        <div className="mb-4">
                                            <label className="text-muted pb-2">Name</label>
                                            <h5 class="card-title my-auto">{accountStories.myAccount.name}</h5>
                                            <hr />
                                        </div>
                                        <div className="mb-3">
                                            <label className="text-muted pb-2">Username</label>
                                            <h5 class="card-title my-auto">{accountStories.myAccount.username}</h5>
                                            <hr />
                                        </div>
                                        <div className="mb-1">
                                            <label className="text-muted pb-2">Email</label>
                                            <h5 class="card-title my-auto">{accountStories.myAccount.email}</h5>
                                        </div>

                                    </div>
                                    <div class="card-body p-4">
                                        <div className="mb-4">
                                            <label className="text-muted pb-2">Name</label>
                                            <h5 class="card-title my-auto">{accountStories.myAccount.name}</h5>
                                            <hr />
                                        </div>
                                        <div className="mb-3">
                                            <label className="text-muted pb-2">Username</label>
                                            <h5 class="card-title my-auto">{accountStories.myAccount.username}</h5>
                                            <hr />
                                        </div>
                                        <div className="mb-1">
                                            <label className="text-muted pb-2">Email</label>
                                            <h5 class="card-title my-auto">{accountStories.myAccount.email}</h5>
                                        </div>

                                    </div><div class="card-body p-4">
                                        <div className="mb-4">
                                            <label className="text-muted pb-2">Name</label>
                                            <h5 class="card-title my-auto">{accountStories.myAccount.name}</h5>
                                            <hr />
                                        </div>
                                        <div className="mb-3">
                                            <label className="text-muted pb-2">Username</label>
                                            <h5 class="card-title my-auto">{accountStories.myAccount.username}</h5>
                                            <hr />
                                        </div>
                                        <div className="mb-1">
                                            <label className="text-muted pb-2">Email</label>
                                            <h5 class="card-title my-auto">{accountStories.myAccount.email}</h5>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade d-flex flex-wrap" id="pills-mystories" role="tabpanel" aria-labelledby="v-pills-profile-tab" tabindex="0">
                                {accountStories.myStories.map((story) => {
                                    return (
                                        <div class="col-12 col-md-6">
                                            <div className="mx-2">


                                                    <div class="card rounded-5 mb-2">
                                                        <div class="card-content d-flex p-2 py-1">
                                                            <img class="rounded-5 cropped" src={story.imageURL} alt="Card image cap" height="100" width="130" />
                                                            <div class="card-body py-2 text-dark">
                                                                <h4 class="card-title overflow-text m-0">{story.title}</h4>
                                                                <div className="">
                                                                    <a className="btn py-0 px-2 border-0" href={"/stories/" + story._id}><i class="bi bi-arrow-up-right-square text-info fs-4"></i></a>
                                                                    <a className="btn py-0 px-2 border-0" ><i onClick={() => { props.updateStory(story); navigate("/dashboard/update") }} class="bi bi-pencil-square text-info fs-4"></i></a>
                                                                    <a className="btn py-0 px-2 border-0" href="#" data-bs-toggle="modal" data-bs-target={"#a" + story._id}><i class="bi bi-trash3 text-danger fs-4"></i></a>



                                                                </div>

                                                            </div>

                                                        </div>
                                                    </div>
                                            </div>
                                            {/* <!-- Modal --> */}
                                            <div class="modal fade" id={"a" + story._id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div class="modal-dialog">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h1 class="modal-title fs-5" id="exampleModalLabel">{story.title} will be deleted permanentally</h1>
                                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div class="modal-footer">
                                                            <a type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</a>
                                                            <a type="button" href="/dashboard" class="btn btn-primary" onClick={() => { deleteStory(story._id) }}>Delete</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                        </div>
                    </div>
                </div>
                ) : <Preloader />}
        </div>
    )
}
export default Dashboard;