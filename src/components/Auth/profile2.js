import axios from "axios";
import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";

const ProfileDetails2 = (props) => {
    const navigate = useNavigate()

    const [profileInfo, setProfileInfo] = useState({
        fname: '',
        lname: '',
        instaUsername: '',
        bio: ''
    })



    const ele1 = document.getElementById("profile2-button");
    const ele2 = document.getElementById("profile2-spinner");
    const ele3 = document.getElementById("profile2-icon")

    const profileRequest = async () => {

        if (ele1.disabled == false) {
            ele2.classList.remove("d-none");
            ele3.classList.add("d-none");
            // capitalize the first letter of fullname
            const f1 = (profileInfo.fname)[0].toUpperCase() + (profileInfo.fname).substring(1) 
            const f2 = (profileInfo.lname)[0].toUpperCase() + (profileInfo.lname).substring(1)



            await axios.post(process.env.REACT_APP_SERVER_URL + '/profileinfo', {
                fullName: f1 + " " + f2,
                profileImgURL: props.profileImgUrl,
                instaUsername: profileInfo.instaUsername,
                bio: profileInfo.bio
            },{ withCredentials: "include" })
                .then((res) => {
                    ele2.classList.add("d-none");
                    ele3.classList.remove("d-none");

                    if (res.data == "updated") {
                        ele1.classList.replace("btn-danger", "btn-success");
                        ele1.innerHTML = "Done";
                        setTimeout(() => {

                            navigate("/dashboard")
                          }, 1000)
                    }

                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }



    if (profileInfo.fname !== "" && profileInfo.lname !== '' && profileInfo.instaUsername !== '') {
        ele1.disabled = false

    } else {
        if (ele1) {

            ele1.disabled = true
        }
    }
    return (
        <div>


            <div className="mx-lg-5 px-lg-5  m-2 p-2 mx-md-3 px-md-3">
                <div className="d-flex justify-content-center">

                    <div className="col-12 col-md-6 col-lg-4">


                        <div className="">
                            <h3 className="fw-bolder fs-2  m-3">Profile details</h3>

                            <div class="row pt-3 px-2">
                                <div class="col-6 mb-2">
                                    <div class="form-outline">
                                        <label class="form-label" for="formFname">First name *</label>
                                        <input autoFocus required type="text" name="fname" class="form-control form-control-lg"
                                            value={profileInfo.fname} onChange={(event) => {
                                                setProfileInfo({
                                                    fname: event.target.value,
                                                    lname: profileInfo.lname,
                                                    instaUsername: profileInfo.instaUsername,
                                                    bio: profileInfo.bio

                                                })
                                            }}

                                        />
                                    </div>
                                </div>
                                <div class="col-6 mb-2">
                                    <div class="form-outline">
                                        <label class="form-label" for="formLname">Last name *</label>
                                        <input required type="text"  class="form-control form-control-lg"
                                            value={profileInfo.lname} onChange={(event) => {
                                                setProfileInfo({
                                                    fname: profileInfo.fname,
                                                    lname: event.target.value,
                                                    instaUsername: profileInfo.instaUsername,
                                                    bio: profileInfo.bio

                                                })
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="p-2">
                                <div class="form-outline">
                                    <label class="form-label" for="formLname">Insta username *</label>
                                    <input required type="text" id="formLname" class="form-control form-control-lg"
                                        value={profileInfo.instaUsername} onChange={(event) => {
                                            setProfileInfo({
                                                fname: profileInfo.fname,
                                                lname: profileInfo.lname,
                                                instaUsername: event.target.value,
                                                bio: profileInfo.bio

                                            })
                                        }}
                                    />
                                </div>
                            </div>
                            <div class="px-2">
                                <label class="form-label" for="textareaBio">  Bio</label>
                                <textarea class="form-control" placeholder="One word/sentence that describes you..." id="textareaBio" rows="4"
                                    value={profileInfo.bio} onChange={(event) => {
                                        setProfileInfo({
                                            fname: profileInfo.fname,
                                            lname: profileInfo.lname,
                                            instaUsername: profileInfo.instaUsername,
                                            bio: event.target.value

                                        })
                                    }}></textarea>
                            </div>
                        </div>

                        <div class="d-flex flex-wrap justify-content-center float-bottom fw-bolder pt-4">
                            <div className="w-100 mx-1" onClick={profileRequest} >

                                <button id="profile2-button" class="btn btn-danger btn-lg w-100 rounded-4" type="button" disabled>Finish
                                    <div id="profile2-spinner" className="spinner-border spinner-border-sm text-white mx-2 d-none"></div>

                                    <i id="profile2-icon" class="my-1 ps-1 bi bi-arrow-right" /></button>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>


    )
}
export default ProfileDetails2;