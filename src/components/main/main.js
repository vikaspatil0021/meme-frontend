import axios from "axios";
import React, { useEffect, useState } from "react";
import AuthModel from "../Auth/authModel";




const Main = () => {
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
        <div className="card">
            <div className=" d-flex justify-content-center mx-2 mx-md-4">
                <div className=" rounded-5 mx-1" style={{ width: "1350px" }}>

                    <div className="" >

                        <div class="rounded-5 d-flex justify-content-center">




                            {(auth) ? <a href="/compose" className="btn btn-primary opacity-75 rounded-4 px-4 my-4 py-3 fs-4">
                                Post a meme today!
                            </a> :
                                <a data-bs-toggle="modal" data-bs-target="#authModel" class="btn btn-primary opacity-75 rounded-4 px-4 my-4 py-3 fs-4">
                                    Post a meme today!
                                </a>}
                                <AuthModel />

                        </div>


                    </div>


                    {/* <div className="">
                            <div class="rounded-5 m-3 ms-md-0 bg-info">


                                <div class="rounded-5 p-5 text-white">


                                    hui
                                </div>
                                <div class="rounded-5 p-5 text-white">


                                    hui
                                </div>
                                <div class="rounded-5 p-5 text-white">


                                    hui
                                </div>
                                <div class="rounded-5 p-5 text-white">


                                    hui
                                </div>
                            </div> */}



                    {/* </div> */}

                </div>
            </div>

        </div>
    )

}


export default Main;