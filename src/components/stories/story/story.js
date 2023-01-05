import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'
import Preloader from "../../preLoader/preloader";
import Comments from "../../comments/comment";
import "./story.css"

import dotenv from "dotenv";
dotenv.config();

const Story = () => {
    const location = useLocation()
    const [storyContent, setStoryContent] = useState({ story: {}, user: {}, sessionUser: {} });
    const [loading, setLoading] = useState(false);
    const [auth, setAuth] = useState('');

    var [c, setCount] = useState(0);
    useEffect(() => {

        axios.get(REACT_APP_SERVER_URL+ location.pathname, { withCredentials: true })
            .then((res) => {
                setStoryContent(res.data)
                setLoading(true);

            }).catch((error) => {
                console.log(error);

            });

        axios.get(REACT_APP_SERVER_URL + "/isauth", { withCredentials: true })
            .then((res) => {
                setAuth(res.data.isAuth)
            }).catch((err) => {
                console.log(err);
            })

    }, []);

    console.log(storyContent);
    const { story, user, sessionUser } = storyContent;
    const { _id: storyId, title, content, imageURL, likes } = story;
    const { _id: userId, name, username } = user;
    const { _id: sessionId } = sessionUser;

    //setting the likes state for the first time 
    useEffect(() => {
        setCount(loading ? likes.length : 0)
    }, [likes])
    const like = loading ? (likes.includes(sessionId)) ? "bi-heart-fill" : "bi-heart" : "bi-heart";

    const likeAndDislike = () => {
        console.log(likes.length);
        const element = document.getElementById("like-dislike-button");
        if (element.classList.contains("bi-heart-fill")) {
            element.classList.replace("bi-heart-fill", "bi-heart");
            if (c != 0) {
                c--;
            }
            setCount(c);
            updatePostLikes("remove");
        } else {
            element.classList.replace("bi-heart", "bi-heart-fill");
            c++;
            setCount(c)
            updatePostLikes("add")

        }
    }

    const updatePostLikes = (message) => {
        console.log(likes);
        axios.put(REACT_APP_SERVER_URL + '/updateLikes', { storyId: storyId, likesArray: likes, msg: message }, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);

            });

    }


    return (
        <div>
            <div className="sticky-top bg-white" >
                <div className="quickLinks px-2 py-2">
                    <div className="d-flex ms-2 ms-md-3">
                        <div className="mx-auto" style={{ width: "1370px" }}>

                            <a href="/" class="btn btn-primary me-1 rounded-4 opacity-75 px-3 fw-semibold"><i class=" my-1 bi bi-house-door" /></a>
                            {(auth)?<a href="/dashboard" class="btn btn-primary me-1 rounded-4 opacity-75 px-3 fw-semibold">Dashboard</a>:
                            <button data-bs-toggle="modal" data-bs-target="#authModel"  class="btn btn-primary me-1 rounded-4 opacity-75 px-3 fw-semibold">Dashboard</button>}
                            <a href="/stories" class="btn btn-primary rounded-4 opacity-75 px-3 fw-semibold"><i class="my-1 pe-1 bi bi-arrow-left" />Stories</a>

                        </div>

                    </div>


                </div>
                <div className="p-1">
                    <div className="d-flex ms-2 ms-md-3">
                        <div className="mx-auto d-flex justify-content-between" style={{ width: "1370px" }}>
                            <div className="m-3" style={{ letterSpacing: "1px" }}>

                                <h1 class="card-title m-auto fs-3 fs-md-1 fw-bolder overflow-text-storytitle">{title} </h1>
                                <span className="text-secondary fs-6">June 20, 2022</span>

                            </div>
                            <div className="me-md-4 me-2 d-flex align-items-center">
                                {(auth) ? 
                                <div onClick={likeAndDislike} className="d-inline-flex likeBorder rounded-4 p-2 px-3">

                                    <i id="like-dislike-button" class={"fs-4 d-inline bi " + like + " text-danger float-end me-2"} ></i>
                                    <h4 className="">{c}</h4>
                                </div> :
                                    <div data-bs-toggle="modal" data-bs-target="#authModel" className="d-inline-flex likeBorder rounded-4 p-2 px-3">

                                        <i id="like-dislike-button" class={"fs-4 d-inline bi " + like + " text-danger float-end me-2"} ></i>
                                        <h4 className="">{c}</h4>
                                    </div>}

                            </div>

                        </div>

                    </div>

                </div>
            </div>
            {loading ?
                (

                    <div className="d-flex" style={{ letterSpacing: "1px" }}>

                        <div className="p-1 mx-auto" style={{ width: "1370px" }}>
                            <div className="m-2">

                                <div class="card storyPage rounded-5 my-2 p-1 p-md-4 p-lg-5 pt-lg-3">
                                    <div className="card-content p-3 p-lg-5 pt-lg-3">
                                        <div className="d-flex justify-content-center">
                                            <a href={"/people/" + username} className="text-decoration-none d-inline-flex">
                                                <div className="card d-inline border-0 p-3 pb-0 rounded-4">

                                                    <img src="https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/caroline-byline-compressor.png?width=48&height=48&name=caroline-byline-compressor.png" className=" rounded-5 cropped me-2" alt="card_img" height="50" width="50" />

                                                    <span className="colorChange fs-5 fw-bold">{name}</span>
                                                </div>
                                            </a>
                                        </div>
                                        <hr className="mx-auto" style={{ width: "75%" }} />
                                        <img src={imageURL} className="card-img rounded-5 storyimagecropped" alt="profile_img" />
                                        <div class="card-body">

                                            <h5 class="card-title fs-2">{title}</h5>
                                            <p class="card-text fs-md-5 fs-4 pt-md-5 pt-3 text-secondary">{content}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <Comments user={sessionUser} storyId={storyId} auth={auth} />
                            </div>

                        </div>

                    </div>
                ) : <Preloader page={location.pathname.slice(1)} />}
        </div>

    );
}
export default Story;