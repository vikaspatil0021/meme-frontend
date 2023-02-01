import axios from "axios";
import React, { useState } from "react";

const ProfileDetails2 = (props) => {

    const [profileInfo, setProfileInfo] = useState({
        fname: '',
        lname: ''
    })




    const profileRequest = async () => {

        await axios.put(process.env.REACT_APP_SERVER_URL + '/profileinfo', {
            username: props.username,
            fullName: profileInfo.fname + " " + profileInfo.lname,
            profileImgURL: props.profileImgUrl
        },
            { withCredentials: "include" })
            .then((res) => {

                console.log(res);

            })
            .catch((error) => {
                console.log(error);
            });
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
                                        <label class="form-label" for="formFname">First name</label>
                                        <input autoFocus required type="text" name="fname" id="formFname" class="form-control form-control-lg"
                                            value={profileInfo.fname} onChange={(event) => {
                                                setProfileInfo({
                                                    fname: event.target.value,
                                                    lname: profileInfo.lname,
                                                    profileImgURL: profileInfo.profileImgURL
                                                })
                                            }}

                                        />
                                    </div>
                                </div>
                                <div class="col-6 mb-2">
                                    <div class="form-outline">
                                        <label class="form-label" for="formLname">Last name</label>
                                        <input required type="text" id="formLname" class="form-control form-control-lg"
                                            value={profileInfo.lname} onChange={(event) => {
                                                setProfileInfo({
                                                    fname: profileInfo.fname,
                                                    lname: event.target.value,
                                                    profileImgURL: profileInfo.profileImgURL

                                                })
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="p-2 pt-3">
                                <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                                    <option selected>Select gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div class="px-2">
                                <label class="form-label" for="textareaBio">  Bio</label>
                                <textarea class="form-control" placeholder="Tell something about yourself..." id="textareaBio" rows="4"></textarea>
                            </div>
                        </div>

                        <div class="d-flex flex-wrap justify-content-center float-bottom fw-bolder pt-4">
                            <div className="w-100 mx-1">

                                <button id="next-button" class="btn btn-danger btn-lg w-100 rounded-4" type="button" data-bs-target="#carouselControls" data-bs-slide="next" >Next
                                    <i class="my-1 ps-1 bi bi-arrow-right" /></button>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>


    )
}
export default ProfileDetails2;