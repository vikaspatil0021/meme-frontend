import React, { useEffect, useState } from "react";
import "./stories.css"

import axios from "axios";
import AuthModel from "../Auth/authModel";
import StoryCard from "./storyCard/storyCard.js";
import Preloader from "../preLoader/preloader";


const Memes = () => {
    const [loading, setLoading] = useState(false);
    const [auth, setAuth] = useState('');
    const [user,setUser] = useState('');

    const [storiesData, setStoriesData] = useState([])
    useEffect(() => {

        axios.get(process.env.REACT_APP_SERVER_URL + "/memes", {mode:"no-cors", withCredentials: "include" })
            .then((res) => {
                console.log(res.data);
                setLoading(true)

                const reverseArr = (res.data.storiesAll).reverse()

                setStoriesData(reverseArr)
                setUser(res.data.fUser)
                // }
            }).catch((error) => {
                console.log(error);

            });

        axios.get(process.env.REACT_APP_SERVER_URL + "/isauth", {mode:"no-cors", withCredentials: "include" })
            .then((res) => {
                setAuth(res.data.isAuth)
            }).catch((err) => {
                console.log(err);
            })
    }, []);

    const displayStory = storiesData.map((story) => {
        return <StoryCard sentStory={story} user={user} />
    })


    //scrolling effect og quicklinks ------CSS available on story.css
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            document.getElementById("sticky-top-stories").style.top = "0";
        } else {
            document.getElementById("sticky-top-stories").style.top = "-55px";
        }
        prevScrollpos = currentScrollPos;
    }

    

    return (
        <div>
            <div id="sticky-top-stories" className="sticky-top quickLinks bg-white px-2 py-2">
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
            </div>) : <Preloader />}
        </div>
    );
}

export default Memes;