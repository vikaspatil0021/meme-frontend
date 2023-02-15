import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Preloader from "../../preLoader/preloader";
import AuthModel from "../../Auth/authModel";
import "./person.css";
import p1 from "./../../img/p1.png"



const Person = () => {
    const location = useLocation()
    const [personInfo, setPersonInfo] = useState({ story: [], user: {}, sessionUser: {} });
    const [allUser, setAllUser] = useState([]);
    const [lengths, setLengths] = useState(0);
    const [auth, setAuth] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL + location.pathname, { mode: "no-cors", withCredentials: "include" })
            .then((res) => {
                console.log(res.data);
                setLoading(true);
                setPersonInfo({ story: res.data.fstories, user: res.data.foundUser, sessionUser: res.data.sessionUser });

            }).catch((error) => {
                console.log(error);

            })

        axios.get(process.env.REACT_APP_SERVER_URL + "/people", {mode:"no-cors", withCredentials: "include" })
            .then((res) => {
                console.log(res.data);
                setAllUser(res.data)
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
    const { story, user, sessionUser } = personInfo
    var { username, name, profileImgURL, instaUsername, bio, followers, followings } = user;
    if(sessionUser){

        var { followings: sFollowings, username: sUsername } = sessionUser;
    }

    useEffect(() => {
        setLengths(loading ? (story.length) : 0);
    }, [story])


    const ele = document.getElementById("follow-button");

    // filtering followers array
    if (loading) {
        var filterFollowers = allUser.filter((each) => {
            return followers.includes(each.username);
        })
        setTimeout(()=>{

            if (followers.includes(sUsername)) {
                ele.innerHTML = 'Following';
                ele.classList.replace("btn-dark", "btn-success");
            }

            
            if(username!==sUsername){
                ele.classList.remove("d-none")
            }
        },1)

    }



    const followTrigger = () => {

        if (ele.innerHTML == "Follow") {
            ele.innerHTML = 'Following';
            ele.classList.replace("btn-dark", "btn-success");
            followers.push(sUsername);
            sFollowings.push(username)

        } else {
            ele.innerHTML = 'Follow'
            ele.classList.replace("btn-success", "btn-dark");
            var followerArray = followers.filter(function (ele) {
                return ele != sUsername;
            })
            var followingArray = sFollowings.filter(function (ele) {
                return ele != username;
            })


            followers = followerArray
            sFollowings = followingArray
        }
        console.log(followers, sFollowings);
        axios.post(process.env.REACT_APP_SERVER_URL + "/followupdate", { followers: followers, user: username, sFollowings: sFollowings, sessionUser: sUsername }, { withCredentials: "include" })
            .then((res) => {
                console.log(res.data);
            }).catch((err) => {
                console.log(err);
            })
    }


    //scrolling effect og quicklinks ------CSS available on story.css
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            document.getElementById("sticky-top-person").style.top = "0";
        } else {
            document.getElementById("sticky-top-person").style.top = "-55px";
        }
        prevScrollpos = currentScrollPos;
    }



    return (
        <div>
            <AuthModel />
            <div id="sticky-top-person" className="sticky-top" >

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

                                        <img class="rounded-5 cropped" src={profileImgURL || p1} alt="Card image cap" height="150" width="150" />
                                    </div>

                                    <div className="m-auto ms-2 mt-4 ms-md-4">

                                        <h2 className="fw-semibold text-dark">{name}</h2>
                                        <h4 className="text-muted">({username})</h4>
                                        <div>
                                            
                                            {(auth) ? <button id="follow-button" onClick={followTrigger} className="d-none btn btn-dark m-2 px-3 rounded-4 fw-semibold pe-3" style={{ opacity: "0.89" }}>
                                                {/* <i class=" bi bi-plus" /> */}
                                                Follow
                                            </button>:<button id="follow-button" data-bs-toggle="modal" data-bs-target="#authModel" className="d-none btn btn-dark m-2 px-3 rounded-4 fw-semibold pe-3" style={{ opacity: "0.89" }}>
                                                {/* <i class=" bi bi-plus" /> */}
                                                Follow
                                            </button>}
                            
                                        </div>
                                    </div>




                                </div>

                            </div>

                        </div>

                        <div className="d-flex ">
                            <div className="py-4 px-4 ps-md-4 mx-auto" style={{ width: "1370px" }}>

                                <div class="nav-pills mb-4 list-group list-group-horizontal" id="pills-tab" role="tablist" >
                                    <button class="active list-group-item opacity-75 rounded-4 me-2" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="true"><i class="bi bi-person-fill"></i></button>
                                    <button class="list-group-item opacity-75 rounded-4 me-2" id="pills-stories-tab" data-bs-toggle="pill" data-bs-target="#pills-stories" type="button" role="tab" aria-controls="pills-stories" aria-selected="true">Memes ({lengths})</button>
                                    <button class="list-group-item opacity-75 me-2 rounded-4" id="pills-friends-tab" data-bs-toggle="pill" data-bs-target="#pills-friends" type="button" role="tab" aria-controls="pills-friends" aria-selected="false">Followers({filterFollowers.length})</button>



                                </div>
                                <div class="tab-content" id="pills-tabContent">
                                    <div class="tab-pane fade show active card p-4 rounded-4" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0">

                                        {(bio) ? <><div >
                                            <h5 className="text-dark">Bio</h5>
                                            <p className="text-muted">- {bio}</p>
                                        </div>
                                            <hr /></> : null}
                                        <div>
                                            <a href={"https://www.instagram.com/" + instaUsername} target="_blank" className="under-line fs-4 text-muted" >
                                                <i class="me-2 text-danger bi bi-instagram"></i>
                                                {instaUsername}
                                                <i class="bi bi-arrow-right mx-2"></i></a>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="pills-stories" role="tabpanel" aria-labelledby="pills-stories-tab" tabindex="0">
                                        <div className="d-flex flex-wrap mw-100">

                                            {story.map((eachStory) => {
                                                return (
                                                    <div className="col-12 col-md-5  me-3">


                                                        <a href={"/memes/" + eachStory._id} class="card-link">
                                                            <div class="card rounded-5 mb-2">
                                                                <div class="card-content d-flex p-2">
                                                                    <img class="rounded-5 cropped" src={eachStory.imageURL} alt="Card image cap" height="100" width="130" />
                                                                    <div class="card-body text-dark">
                                                                        <h4 class="card-title overflow-text">{eachStory.title}</h4>
                                                                        <div className="card-content d-inline-flex flex-wrap rounded-3">
                                                                        <div className="d-flex float-end rounded-4 p-2 px-3 me-1">

                                                                            <i id="like-dislike-button" class={"fs-4 d-inline bi-eye text-primary float-end me-2"} ></i>
                                                                            <h4 className="">{eachStory.views || 0}</h4>
                                                                        </div>
                                                                        <div className="d-flex mt-2">

                                                                            <i class={"bi bi-heart mx-2 d-inline fs-5 text-danger"} />
                                                                            <h5 className="fw-lighter">{eachStory.likes.length}</h5>
                                                                        </div>
                                                                    </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="pills-friends" role="tabpanel" aria-labelledby="pills-friends-tab" tabindex="0">
                                    <div className="d-flex flex-wrap mw-100">

                                        {filterFollowers.map((follower) => {



                                            return (
                                                <div className="col-12 col-md-5  me-3">


                                                    <a href={"/people/" + follower.username} class="card-link">
                                                        <div class="card rounded-5 mb-2">
                                                            <div class="card-content d-flex p-2">
                                                                <img class="rounded-5 cropped" src={follower.profileImgURL} alt="Card image cap" height="100" width="130" />
                                                                <div class="card-body text-dark">
                                                                <h5 class="card-title fw-semibold" style={{ fontSize: "22px" }}>{follower.name}</h5>

                                                                    <h4 class="card-title overflow-text">{follower.username}</h4>


                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            )
                                        })}
                                        </div>
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