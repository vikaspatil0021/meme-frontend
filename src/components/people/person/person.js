import axios from "axios";
import React, { useEffect, useState } from "react";
import Nav from "../../Header/header";


const Person = () => {

    const [auth, setAuth] = useState('');
    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL + "/isauth", { withCredentials: "include" })
            .then((res) => {
                setAuth(res.data.isAuth)
            }).catch((err) => {
                console.log(err);
            })

    }, []);

    return (
        <div>
            <div className="" >

                <div className="sticky-top  bg-white quickLinks px-2 py-2">
                    <div className="d-flex ms-2 ms-md-3">
                        <div className="mx-auto" style={{ width: "1370px" }}>

                            <a href="/" class="btn btn-primary me-1 rounded-4 opacity-75 px-3 fw-semibold"><i class=" my-1 bi bi-house-door" /></a>
                            {(auth) ? <a href="/dashboard" class="btn btn-primary me-1 rounded-4 opacity-75 px-3 fw-semibold">Dashboard</a> :
                                <button data-bs-toggle="modal" data-bs-target="#authModel" class="btn btn-primary me-1 rounded-4 opacity-75 px-3 fw-semibold">Dashboard</button>}
                            <a href="/people" class="btn btn-primary rounded-4 opacity-75 px-3 fw-semibold"><i class="my-1 pe-1 bi bi-arrow-left" />People</a>

                        </div>

                    </div>
                </div>
                <div className="p-1  bg-white border-bottom">
                    <div className="d-flex ms-2 ms-md-3">
                        <div className="mx-auto d-flex " style={{ width: "1370px" }}>
                            <div className="m-3 d-flex">

                                <div className="col-6">

                                    <img class="rounded-5 cropped card-img" src="https://res.cloudinary.com/dt55mivpf/image/upload/v1671421250/MYBLOG/POSTS/y8firp0fwrq4nicvrjw3.jpg" alt="Card image cap" />
                                </div>
                                <div className="">
                                    <div className="m-3 d-inline fs-4 fw-semibold text-muted">
                                        vikaspatil0021
                                    </div>
                                </div>
                            </div>




                        </div>

                    </div>

                </div>
            </div>

        </div>
    );
}


export default Person;