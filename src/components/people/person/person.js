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
            <div className="bg-white" >

                <div className="sticky-top quickLinks px-2 py-2">
                    <div className="d-flex ms-2 ms-md-3">
                        <div className="mx-auto" style={{ width: "1370px" }}>

                            <a href="/" class="btn btn-primary me-1 rounded-4 opacity-75 px-3 fw-semibold"><i class=" my-1 bi bi-house-door" /></a>
                            {(auth) ? <a href="/dashboard" class="btn btn-primary me-1 rounded-4 opacity-75 px-3 fw-semibold">Dashboard</a> :
                                <button data-bs-toggle="modal" data-bs-target="#authModel" class="btn btn-primary me-1 rounded-4 opacity-75 px-3 fw-semibold">Dashboard</button>}
                            <a href="/people" class="btn btn-primary rounded-4 opacity-75 px-3 fw-semibold"><i class="my-1 pe-1 bi bi-arrow-left" />People</a>

                        </div>

                    </div>
                </div>
                <div className="border-bottom">
                    <div className="d-flex ms-2 ms-md-3">
                        <div className="d-flex mx-auto card-content" style={{ width: "1370px" }}>
                            <div className="p-3">

                                <img class="rounded-5 cropped" src="https://res.cloudinary.com/dt55mivpf/image/upload/v1671421250/MYBLOG/POSTS/y8firp0fwrq4nicvrjw3.jpg" alt="Card image cap" height="150" width="150" />
                            </div>
                            <div className="p-4 ps-1 ps-md -4">
                                <h4 className="fw-semibold text-muted">vikaspatil001</h4>
                            </div>




                        </div>

                    </div>

                </div>
            </div>

        </div>
    );
}


export default Person;