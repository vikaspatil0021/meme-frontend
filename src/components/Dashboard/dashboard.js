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
            {loading ?
                (<div>
                    <div>
                        <div className="d-flex flex-wrap justify-content-between px-5 py-4" style={{ backgroundColor: "white" }}>
                            <h1 className="fw-bolder fs-2 my-auto">
                                Dashboard
                            </h1>

                            <div className="my-auto">
                                <a href="/compose" class="btn btn-primary mx-2 d-none d-md-inline">Compose</a>
                                <a href="https://my-blog-backend-1ict.onrender.com/logout" class="btn btn-danger me-lg-5">Log out</a>
                            </div>
                        </div>
                        <hr className="p-0 m-0" />
                    </div>
                    <div>
                        <div className="mx-5 mt-3">
                            <a href="/" class="btn btn-success me-1">Home</a>
                            <a href="/stories" class="btn btn-success me-1">Stories</a>
                            <a href="/people" class="btn btn-success">People</a>
                            <a href="/compose" class="btn btn-success float-end d-md-none">Compose</a>

                        </div>


                        <div class="d-flex align-items-start px-4">
                            <div class="nav flex-column nav-pills p-3 col-3 list-group" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                <button class="active list-group-item p-3" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">My Account</button>
                                <button class="list-group-item p-3" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">My Stories</button>

                            </div>
                            <div class="tab-content p-3 col-9" id="v-pills-tabContent">
                                <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab" tabindex="0">
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
                                    </div>
                                </div>

                                <div class="tab-pane fade d-flex row" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab" tabindex="0">
                                    {accountStories.myStories.map((story) => {
                                        return (
                                            <div class="card mt-0 m-1 p-0 col-5">
                                                <h5 class="card-header py-3">{story.title}</h5>
                                                <div class="card-body">
                                                    {/* <hr /> */}
                                                    <div>
                                                        <a className="btn py-0 px-2 border-0" href={"/stories/" + story._id}><i class="bi bi-arrow-up-right-square text-info fs-4"></i></a>
                                                        <a className="btn py-0 px-2 border-0" ><i onClick={() => { props.updateStory(story); navigate("/dashboard/update") }} class="bi bi-pencil-square text-info fs-4"></i></a>
                                                        <a className="btn py-0 px-2 border-0" href="#" data-bs-toggle="modal" data-bs-target={"#a" + story._id}><i class="bi bi-trash3 text-danger fs-4"></i></a>


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
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                ) : <Preloader />}
        </div>
    )
}
export default Dashboard;