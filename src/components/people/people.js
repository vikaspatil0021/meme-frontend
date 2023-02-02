import axios from "axios";
import React, { useEffect, useState } from "react";
import AuthModel from "../Auth/authModel";
import Preloader from "../preLoader/preloader";
import PersonCard from "./personCard/personCard";


const People = () => {
    const [loading, setLoading] = useState(false);
    const [auth, setAuth] = useState('');


    const [peopleData, setPeopleData] = useState([])
    useEffect(() => {

        axios.get(process.env.REACT_APP_SERVER_URL + "/people", { withCredentials: "include" })
            .then((res) => {
                console.log(res.data);
                const reverseArr = (res.data).reverse()
                setPeopleData(reverseArr);
                setLoading(true)
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

    const displayPerson = peopleData.map((person) => {
        return <PersonCard sentPerson={person} />
    })

    return (
        <div>

            <div className="sticky-top quickLinks bg-white px-2 py-2">
                <div className="d-flex ms-2 ms-md-3">
                    <div className="mx-auto" style={{ width: "1370px" }}>

                    <a href="/" class="btn btn-primary me-1 rounded-4 opacity-75 px-3 fw-semibold"><i class=" my-1 bi bi-house-door" /></a>
                    {(auth)?<a href="/dashboard" class="btn btn-primary me-1 rounded-4 opacity-75 px-3 fw-semibold">Dashboard</a>:
                            <button data-bs-toggle="modal" data-bs-target="#authModel"  class="btn btn-primary me-1 rounded-4 opacity-75 px-3 fw-semibold">Dashboard</button>}
                                                    <a href="/stories" class="btn btn-primary rounded-4 opacity-75 px-3 fw-semibold">Stories</a>

                    </div>

                </div>
            </div>
            <AuthModel />
                {loading ?
                    (<div className="mx-auto mt-3 px-2 d-flex flex-wrap mw-100" style={{ width: "1400px" }}>
                        {displayPerson}
                    </div>) : <Preloader  />}

        </div>
    );
}

export default People;