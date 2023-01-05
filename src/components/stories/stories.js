import React, { useEffect, useState } from "react";
import "./stories.css"

import axios from "axios";
import AuthModel from "../Auth/authModel";
import StoryCard from "./storyCard/storyCard.js";
import Preloader from "../preLoader/preloader";
const Stories = () => {
    const [loading, setLoading] = useState(false);
    const [auth, setAuth] = useState('');
    const [user,setUser] = useState('');

    const [storiesData, setStoriesData] = useState([])
    useEffect(() => {

        axios.get(SERVER_URL + "/stories", { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                setLoading(true)
                setStoriesData(res.data.storiesAll)
                setUser(res.data.fUser)
                // }
            }).catch((error) => {
                console.log(error);

            });

        axios.get(SERVER_URL + "/isauth", { withCredentials: true })
            .then((res) => {
                setAuth(res.data.isAuth)
            }).catch((err) => {
                console.log(err);
            })
    }, []);

    const displayStory = storiesData.map((story) => {
        return <StoryCard sentStory={story} user={user} />
    })

    

    return (
        <div>
            <div className="sticky-top quickLinks bg-white px-2 py-2">
                <div className="d-flex ms-2 ms-md-3">
                    <div className="mx-auto" style={{ width: "1370px" }}>

                        <a href="/" class="btn btn-primary me-1 rounded-4 opacity-75 px-3 fw-semibold"><i class=" my-1 bi bi-house-door" /></a>
                        {(auth)?<a href="/dashboard" class="btn btn-primary me-1 rounded-4 opacity-75 px-3 fw-semibold">Dashboard</a>:
                            <button data-bs-toggle="modal" data-bs-target="#authModel"  class="btn btn-primary me-1 rounded-4 opacity-75 px-3 fw-semibold">Dashboard</button>}
                                                   <a href="/people" class="btn btn-primary rounded-4 opacity-75 px-3 fw-semibold">People</a>
                    </div>

                </div>


            </div>
                    <AuthModel />

            
            {loading ? 
            (<div className="mx-auto mt-3 px-2 d-flex flex-wrap mw-100" style={{ width: "1400px" }}>
                {displayStory}
            </div>) : <Preloader page={"stories"} />}
        </div>
    );
}

export default Stories;