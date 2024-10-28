import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./header.css";


const Nav = () => {
    const [checkAuth, setCheckAuth] = useState(false);
    const location = useLocation()

    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL + "/isauth", { withCredentials: "include" })
            .then((res) => {
                setCheckAuth(res.data.isAuth)
            }).catch((err) => {
                console.log(err);
            })
    }, [])

    // if(location.pathname==="/"){
    //     setTimeout(()=>{

    //         document.querySelector("#header").classList.add("d-none")
    //     },10)

    // }
    return (
        <div id="header" className="mx-auto justify-content-around nav">
            <div className="navbar p-3" style={{ width: "1410px" }}>

                <div>
                    <a href="/" className="navbar-brand fs-5 fw-bolder ms-2 ms-md-3">IMEME</a>
                </div>


                <a class="ps-2 me-2 me-md-3" type="button" data-bs-toggle="collapse" href="#collapseExample">
                    <i class="bi bi-list text-light fs-5 px-1"></i>
                </a>
                <div className="w-100">
                    <div class="collapse" id="collapseExample">
                        <hr className="text-white w-80" />
                        <div class="nav">
                            <ul class="mx-2 navbar-nav">
                                {(checkAuth) ?
                                    <div>
                                        <li className="nav-item"><a class="nav-link text-white fs-5" href="/dashboard">Dashboard</a></li>
                                        <li className="nav-item"><a class="nav-link text-white fs-5" href="/compose">Compose</a></li>
                                        <li className="nav-item"><a class="nav-link text-danger fs-5" href="https://meme-backend-0021.vercel.app/logout">Log out</a></li>
                                    </div> :
                                    <div>
                                        <li className="nav-item"><a class="nav-link text-white fs-5" href="/login">Log in</a></li>
                                        <li className="nav-item"><a class="nav-link text-white fs-5" href="/register">Sign up</a></li>
                                    </div>}
                            </ul>                        </div>
                    </div>


                </div>

            </div>

        </div>
    );
}

export default Nav;
