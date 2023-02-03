import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as bootstrap from "bootstrap"

const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: '',
        password: ''
    });


    const ele1 = document.getElementById("login-button");
    const ele2 = document.getElementById("login-spinner");
    const ele3 = document.getElementById("login-arrow");

    //-----------Current Auth status-----------
    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL + "/isauth", { withCredentials: "include" })
            .then((res) => {
                if (res.data.isAuth) {
                    navigate("/stories")
                }
            }).catch((err) => {
                console.log(err);
            })
    }, [])

    //--------Confirm User and Login
    const loginRequest = async (e) => {
        e.preventDefault();

        if (ele1.disabled == false) {
            ele2.classList.remove("d-none");
            ele3.classList.add("d-none");

            await axios.post(process.env.REACT_APP_SERVER_URL + '/login', user, { withCredentials: "include" })
                .then((res) => {
                    ele2.classList.add("d-none");
                    ele3.classList.remove("d-none");
                    console.log(res);
                    if (res.data.isAuth) {
                        ele1.classList.replace("btn-danger", "btn-success");
                        ele1.innerHTML = "Authorized";

                        setTimeout(() => {


                            navigate("/dashboard");
                        }, 800)
                    }

                })
                .catch((error) => {
                    ele2.classList.add("d-none");
                    ele3.classList.remove("d-none");
                    const toastLive = document.getElementById('liveToast-login');
                    const toast = new bootstrap.Toast(toastLive)
                    toast.show()
                    console.log(error);

                });

        }

    }
    if (user.username !== '' && user.password !== '') {
        ele1.disabled = false

    } else {
        if (ele1) {

            ele1.disabled = true
        }
    }
    return (
        <div>
            <div>
                <div className="quickLinks sticky-top bg-white px-2 py-2">
                    <div className=" d-flex ms-2 ms-md-3">
                        <div className=" mx-auto" style={{ width: "1370px" }}>

                            <a href="/" class="btn btn-primary me-1 rounded-4 opacity-75 px-3 fw-semibold"><i class="my-1 pe-1 bi bi-arrow-left" /><i class=" my-1 bi bi-house-door" /></a>
                            <a href="/stories" class="btn btn-primary rounded-4 opacity-75 px-3 fw-semibold me-1"><i class="my-1 pe-1 bi bi-arrow-left" />Stories</a>

                            <a href="/people" class="btn btn-primary rounded-4 opacity-75 px-3 fw-semibold"><i class="my-1 pe-1 bi bi-arrow-left" />People</a>
                        </div>

                    </div>


                </div>
                <div className="d-flex justify-content-center">
                    <div class="toast-container position-fixed bottom-0 p-3">

                        <div id="liveToast-login" class="toast align-items-center bg-danger" role="alert" aria-live="assertive" aria-atomic="true">
                            <div class="d-flex">
                                <div class="toast-body text-white">
                                    Username or password is incorrect
                                </div>
                                <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" mx-lg-5 px-lg-5  m-2 p-2 mx-md-3 px-md-3">
                    <div className="mt-4 d-flex justify-content-center">



                        <form className="col-lg-3 col-md-5">

                            <h3 class="fw-normal mb-3 pb-3">Log in</h3>

                            <div class="form-outline mb-4">
                                <label class="form-label" for="formUsername">Username*</label>
                                <input autoFocus required type="email" name="username" id="formUsername" class="form-control form-control-lg" onChange={(e) => { setUser({ username: e.target.value, password: user.password }) }} value={user.username} />
                            </div>

                            <div class="form-outline mb-4">
                                <label class="form-label" for="formPassword">Password*</label>
                                <input required type="password" name="password" id="formPassword" class="form-control form-control-lg" onChange={(e) => { setUser({ username: user.username, password: e.target.value }) }} value={user.password} />
                            </div>

                            {/* <div class="pt-1 mb-4">
                                <button class="btn btn-danger btn-lg" onClick={loginRequest} type="submit">Login</button>
                            </div> */}
                            <div class="d-flex flex-wrap justify-content-center pb-4">
                                <div className="w-100" onClick={loginRequest}>

                                    <button id="login-button" class="btn btn-danger btn-lg w-100 rounded-4"
                                        type="button" disabled>Login
                                        <div id="login-spinner" className="spinner-border spinner-border-sm text-white mx-2 d-none"></div>

                                        <i id="login-arrow" class="my-1 ps-1 bi bi-arrow-right" /></button>
                                </div>


                            </div>

                            <p class="small mb-5 pb-lg-2"><a class="text-muted" href="#!">Forgot password?</a></p>
                            <p>Don't have an account? <a href="/register" class="link-danger">Register here</a></p>

                        </form>
                    </div>

                </div>

            </div>
        </div>




    )

}

export default Login;