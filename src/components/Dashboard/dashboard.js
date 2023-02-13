import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Preloader from "../preLoader/preloader";
import $ from "jquery";
import * as bootstrap from "bootstrap";

const Dashboard = (props) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [file, selectedFile] = useState('');

    const [accountStories, setAccountStories] = useState({
        myAccount: {},
        myStories: []
    })

    const [updateDetails, setUpdateDetails] = useState({})

    console.log(updateDetails);


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
                setUpdateDetails(res.data.myAccount)
            }).catch((error) => {
                console.log(error);

            });

   

    }, [])
    const deleteStory = async (storyId) => {

        localStorage.setItem('currentActiveTab', $("#pills-mystories-tab").attr('data-bs-target'));

       
        await axios.delete(process.env.REACT_APP_SERVER_URL + "/delete", { data: { Id: storyId }, withCredentials: "include" })
            .then((res) => {
                console.log(res.data);
                window.location.reload();
            }).catch((err) => {
                console.log(err);
            });
            
        }
        //controlling the dashboard pills via js-------
    const currentTab = ()=>{
        const tabB1 = document.getElementById('pills-account-tab');
        const tabB2 = document.getElementById("pills-mystories-tab");
    
        const tabC1 = document.getElementById("pills-account");
        const tabC2 = document.getElementById("pills-mystories");
    
        tabB1.classList.remove("active");
        tabB2.classList.add("active");
    
        tabC1.classList.remove("show","active");
        tabC2.classList.add("show","active");

        localStorage.removeItem("currentActiveTab");

    }
    setTimeout(()=>{

        var currentActiveTab = localStorage.getItem('currentActiveTab');
        if(currentActiveTab){

            currentTab()


        }

    },1300)

     



    // edit -profile -phtoto --------------------
    // elemnts by ids------------------
    const ele1 = document.getElementById("upload-spinner");

    const ele2 = document.getElementById("choose-photo");
    // const ele3 = document.getElementById("next-button");
    const ele4 = document.getElementById("upload-button");
    const ele5 = document.getElementById("upload-check-icon");
    const ele6 = document.getElementById("updateinfo-icon");
    const ele7 = document.getElementById("updateinfo-spinner");
    const ele8 = document.getElementById("updateinfo-button");



    const updateRequest = async (imgUrl) => {
        var data = {}


        if (imgUrl != '') {
            data = {
                imgUrl: imgUrl
            }

        } else {
            ele7.classList.remove("d-none");
            ele6.classList.add("d-none")
            data = {
                ...updateDetails
            }

        }

        await axios.post(process.env.REACT_APP_SERVER_URL + "/editprofile", data, { withCredentials: "include" })
            .then((res) => {
                if (imgUrl == '') {
                    ele8.classList.replace("btn-primary", "btn-success")
                    ele8.innerHTML = "Saving ...";
                } else {
                    ele4.innerHTML = "Redirecting ...";

                }

                console.log(res.data);
                setTimeout(() => {
                    window.location.reload()

                }, 800)
            }).catch((err) => {
                console.log(err);
            })
    }





    const uploadAndUpdateImage = async () => {
        ele1.classList.remove("d-none");



        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "gkcutnp6")
        await axios.post("https://api.cloudinary.com/v1_1/dt55mivpf/image/upload", formData)
            .then((res) => {
                // ele3.disabled = false;
                updateRequest(res.data.url)
                ele2.disabled = true;
                ele1.classList.add("d-none");
                ele4.classList.replace("btn-primary", "btn-success");
                ele4.innerHTML = "Uploaded";
                ele4.disabled = true;
                ele5.classList.remove("d-none");


            })
            .catch((error) => {
                console.log(error);

            });


    }
    
        
    //scrolling effect og quicklinks ------CSS available on story.css

    var prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            document.getElementById("sticky-top-dash").style.top = "0";
        } else {
            document.getElementById("sticky-top-dash").style.top = "-125px";
        }
        prevScrollpos = currentScrollPos;
    }

    return (
        <div>
            <div className="bg-white px-2 py-2">
                <div className=" d-flex ms-2 ms-md-3">
                    <div className=" mx-auto" style={{ width: "1370px" }}>

                        <a href="/" class="btn btn-primary me-1 rounded-4 opacity-75 px-3 fw-semibold"><i class="my-1 pe-1 bi bi-arrow-left" /><i class=" my-1 bi bi-house-door" /></a>
                        <a href="/memes" class="btn btn-primary rounded-4 opacity-75 px-3 fw-semibold me-1"><i class="my-1 pe-1 bi bi-arrow-left" />Memes</a>

                        <a href="/people" class="btn btn-primary rounded-4 opacity-75 px-3 fw-semibold"><i class="my-1 pe-1 bi bi-arrow-left" />People</a>
                    </div>

                </div>


            </div>
            <div id="sticky-top-dash" className="sticky-top bg-white border-top">


                <div className="d-flex">
                    <div className="d-flex flex-wrap justify-content-between py-3 mx-auto px-3" style={{ width: "1390px" }}>
                        <h1 className="fw-bolder fs-2 my-auto ms-1 ms-md-2">
                            Dashboard
                        </h1>
                        {(loading) ?
                            <div className="my-auto">
                                <a href="/compose" class="btn btn-primary opacity-75 rounded-4 ps-3">
                                    Compose
                                    <i class="mx-2 pe-1 bi bi-arrow-right " />
                                </a>
                            </div> : null}
                    </div>
                </div>
                {(loading) ?
                    <div className="d-flex ps-2 ps-md-3 border-bottom">


                        <div class="nav-pills p-2 pt-0 list-group list-group-horizontal mx-auto" id="pills-tab" role="tablist" style={{ width: "1370px" }}>
                            <button class="active list-group-item opacity-75 rounded-4 me-2" id="pills-account-tab" data-bs-toggle="pill" data-bs-target="#pills-account" type="button" role="tab" aria-controls="pills-account" aria-selected="true">Account</button>
                            <button class="list-group-item opacity-75 rounded-4 me-2" id="pills-mystories-tab" data-bs-toggle="pill" data-bs-target="#pills-mystories" type="button" role="tab" aria-controls="pills-mystories" aria-selected="false">My Memes</button>
                            <button class="list-group-item opacity-75 me-2 rounded-4" id="pills-myfriends-tab" data-bs-toggle="pill" data-bs-target="#pills-myfriends" type="button" role="tab" aria-controls="pills-myfriends" aria-selected="false">My Friends</button>
                        </div>
                    </div> : null}

            </div>

            {loading ?
                (<div className="d-flex">





                    <div class="mx-auto px-2" style={{ width: "1370px" }}>

                        <div class="tab-content py-3 px-0" id="pills-tabContent">
                            <div class="tab-pane fade show active" id="pills-account" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">

                                <div class="card rounded-5 mb-2">
                                    <div class="card-body p-4">
                                        <div className="p-3 pe-0 pt-0 ps-0">

                                            <img class="rounded-5 cropped" src={accountStories.myAccount.profileImgURL} alt="Card image cap" height="150" width="150" />
                                            <div className="d-inline dropstart">

                                                <button className="rounded-5 border-0 float-end" data-bs-toggle="dropdown">

                                                    <i class="bi bi-three-dots fs-4 float-end"></i>
                                                </button>
                                                <ul className=" p-2 dropdown-menu rounded-4">

                                                    <li><a className="btn btn-primary rounded-4 dropdown-item pt-2" href="#" data-bs-toggle="modal" data-bs-target="#update-profile-photo" >Edit profile photo</a></li>
                                                    <hr className="m-2" />
                                                    <li><a className="btn btn-primary rounded-4 dropdown-item pb-2" href="#" data-bs-toggle="modal" data-bs-target="#update-profile-info" >Edit profile info</a></li>




                                                </ul>
                                            </div>
                                        </div>
                                        {/* update modals-PHOTO----------------------------------------------------------------------- */}



                                        <div class="modal fade aniModal" tabindex="-1" id="update-profile-photo">
                                            <div class="modal-dialog  modal-fullscreen-md-down ">
                                                <div class="modal-content rounded-5">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title ms-3">Edit profile photo</h5>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div className=" m-md-5">
                                                            <h3 className="fw-bolder fs-2  m-3">Update photo</h3>

                                                            <div class="card rounded-5 mb-2">
                                                                <div class="card-content d-flex p-3">
                                                                    <div className="col-5">
                                                                        <img className="card-img rounded-5 cropped" src={(!file) ? accountStories.myAccount.profileImgURL : URL.createObjectURL(file)} height="150" />
                                                                    </div>
                                                                    <div className="card-body d-flex flex-wrap justify-content-center align-items-center">
                                                                        <span class="position-absolute btn btn-primary rounded-4 opacity-75">Change image</span>
                                                                        <input id="choose-photo" type="file" accept="image/jpeg, image/png, image/jpg" class="form-control opacity-0" style={{ width: "130px" }} onChange={(e) => {
                                                                            const f = e.target.files[0];
                                                                            selectedFile(f);
                                                                        }} />

                                                                    </div>

                                                                </div>

                                                            </div>
                                                            <div className="d-flex flex-wrap justify-content-center">

                                                                <button id="upload-button" class="btn btn-lg btn-primary m-2 w-100 rounded-4" onClick={uploadAndUpdateImage}>Upload
                                                                    <div id="upload-spinner" className="spinner-border spinner-border-sm text-white mx-2 d-none"></div>

                                                                    <i id="upload-check-icon" class="bi bi-check-circle-fill mx-2 d-none"></i>

                                                                </button>
                                                            </div>
                                                            <span className="text-danger">*After uploading, you will be redirected automatically.</span>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>


                                        {/* update modals-INFO----------------------------------------------------------------------- */}



                                        <div class="modal fade aniModal" tabindex="-1" id="update-profile-info">
                                            <div class="modal-dialog modal-dialog-scrollable modal-fullscreen-md-down">
                                                <div class="modal-content rounded-5">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title ms-3">Edit profile info</h5>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div className=" m-md-5 m-3 mt-md-3">

                                                            <div className="mb-3">
                                                                <label className="text-muted pb-2">Name</label>
                                                                <input autoFocus required type="text" name="postName" id="formPostName" class="form-control form-control-lg" onChange={(e) => { setUpdateDetails({ name: e.target.value, email: updateDetails.email, instaUsername: updateDetails.instaUsername, bio: updateDetails.bio }) }} value={updateDetails.name} />

                                                            </div>
                                                            {/* <div className="mb-3">
                                                                <label className="text-muted pb-2">Username</label>
                                                                <input  type="text" name="postName" id="formPostName" class="form-control form-control-lg" onChange={(e) => { setUpdateDetails({ name: updateDetails.name, username: e.target.value,email:updateDetails.email,instaUsername:updateDetails.instaUsername,bio:updateDetails.bio }) }} value={updateDetails.username} />
                                                                <span className="text-danger">*If username is changed, you will need to log in again</span>

                                                            </div> */}
                                                            <div className="mb-3">
                                                                <label className="text-muted pb-2">Email</label>
                                                                <input type="text" name="postName" id="formPostName" class="form-control form-control-lg" onChange={(e) => { setUpdateDetails({ name: updateDetails.name, email: e.target.value, instaUsername: updateDetails.instaUsername, bio: updateDetails.bio }) }} value={updateDetails.email} />

                                                            </div>
                                                            <div className="mb-3">
                                                                <label className="text-muted pb-2">Insta username</label>
                                                                <input type="text" name="postName" id="formPostName" class="form-control form-control-lg" onChange={(e) => { setUpdateDetails({ name: updateDetails.name, email: updateDetails.email, instaUsername: e.target.value, bio: updateDetails.bio }) }} value={updateDetails.instaUsername} />


                                                            </div>
                                                            <div className="mb-3">
                                                                <label className="text-muted pb-2">Bio</label>
                                                                <input type="text" name="postName" id="formPostName" class="form-control form-control-lg" onChange={(e) => { setUpdateDetails({ name: updateDetails.name, email: updateDetails.email, instaUsername: updateDetails.instaUsername, bio: e.target.value }) }} value={updateDetails.bio} />


                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary rounded-4" data-bs-dismiss="modal">Close</button>
                                                        <button id="updateinfo-button" type="button" class="btn btn-primary rounded-4 ps-3" onClick={() => { updateRequest('') }}>Save changes
                                                            <div id="updateinfo-spinner" className="spinner-border spinner-border-sm text-white mx-2 d-none"></div>

                                                            <i id="updateinfo-icon" class="ms-1 bi bi-arrow-right" />

                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>




                                        <div className="ms-2">

                                            <div className="">
                                                <label className="text-muted pb-2">Name</label>
                                                <h5 class="card-title my-auto">{accountStories.myAccount.name}</h5>
                                                <hr />
                                            </div>
                                            <div className="">
                                                <label className="text-muted pb-2">Username</label>
                                                <h5 class="card-title my-auto">{accountStories.myAccount.username}</h5>
                                                <hr />
                                            </div>
                                            <div className="">
                                                <label className="text-muted pb-2">Email</label>
                                                <h5 class="card-title my-auto">{accountStories.myAccount.email}</h5>
                                                <hr />

                                            </div>
                                            <div className="">
                                                <label className="text-muted pb-2">Insta username</label>
                                                <h5 class="card-title my-auto">{accountStories.myAccount.instaUsername}</h5>
                                                <hr />

                                            </div>
                                            <div className="">
                                                <label className="text-muted pb-2">Bio</label>
                                                <h5 class="card-title my-auto">{accountStories.myAccount.bio}</h5>
                                                <hr />

                                            </div>

                                        </div>



                                        <div className="d-flex mt-4">
                                            <a href="https://my-blog-backend-1ict.onrender.com/logout" class="btn btn-danger rounded-4 px-5">Log out
                                                <i class="mx-2 pe-1 bi bi-arrow-right " />
                                            </a>
                                        </div>
                                    </div>



                                </div>
                            </div>
                            <div class="tab-pane fade" id="pills-mystories" role="tabpanel" aria-labelledby="v-pills-profile-tab" tabindex="0">
                                <div className="d-flex flex-wrap">
                                    {accountStories.myStories.map((story) => {
                                        return (
                                            <div class="col-12 col-md-6">
                                                <div className="mx-2">


                                                    <div class="card rounded-5 mb-2">
                                                        <div class="card-content d-flex p-2">
                                                            <img class="rounded-5 cropped" src={story.imageURL} alt="Card image cap" height="100" width="130" />
                                                            <div class="card-body py-2 text-dark">
                                                                <h4 class="card-title overflow-text m-0">{story.title}</h4>
                                                                <div className="">
                                                                    <a className="btn py-0 px-2 border-0" target="_blank" href={"/memes/" + story._id}><i class="bi bi-arrow-up-right-square text-info fs-4"></i></a>
                                                                    <a className="btn py-0 px-2 border-0" ><i onClick={() => { props.updateStory(story); navigate("/dashboard/update") }} class="bi bi-pencil-square text-info fs-4"></i></a>
                                                                    <a className="btn py-0 px-2 border-0" href="#" data-bs-toggle="modal" data-bs-target={"#a" + story._id}><i class="bi bi-trash3 text-danger fs-4"></i></a>



                                                                </div>

                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>

                                                {/* <!-- Modal --> */}
                                                <div class="modal fade aniModal" id={"a" + story._id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                    <div class="modal-dialog my-5">
                                                        <div class="modal-content rounded-5">
                                                            <div class="modal-header">
                                                                <h1 class="modal-title fs-5 px-3" id="exampleModalLabel">{story.title} will be deleted permanentally</h1>
                                                            </div>
                                                            <div class="modal-footer">
                                                                <a type="button" class="btn btn-primary rounded-4" data-bs-dismiss="modal">Cancel</a>
                                                                <button type="button" class="btn btn-danger rounded-4" onClick={() => { deleteStory(story._id) }}>Delete</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div class="tab-pane fade" id="pills-myfriends" role="tabpanel" aria-labelledby="v-pills-profile-tab" tabindex="0">
                                gfgxfb
                            </div>

                        </div>
                    </div>
                </div>
                ) : <Preloader />}
        </div>
    )
}
export default Dashboard;