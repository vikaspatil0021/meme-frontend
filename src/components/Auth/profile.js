import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import p1 from "../img/p1.png"

const ProfileDetails = (props) => {
    const navigate = useNavigate()

    const [file, selectedFile] = useState();
    const [profileInfo, setProfileInfo] = useState({
        fname: '',
        lname: '',
        profileImgURL: ''
    });

    const uploadProfileImage = async () => {


        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "gkcutnp6")
        await axios.post("https://api.cloudinary.com/v1_1/dt55mivpf/image/upload", formData)
            .then((res) => {
                console.log(res.data.url);
                setProfileInfo({ fname: profileInfo.fname, lname: profileInfo.lname, profileImgURL: res.data.url })

            })
            .catch((error) => {
                console.log(error);

            });


    }

    const profileRequest = async () => {

        await axios.put(process.env.REACT_APP_SERVER_URL + '/profileinfo', {
            username: props.username,
            fullName: profileInfo.fname + " " + profileInfo.lname,
            profileImgURL: profileInfo.profileImgURL
        }, 
        { withCredentials: "include" })
            .then((res) => {

                console.log(res);
                navigate("/dashboard")

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

                            <a className="btn float-end border-0 btn-primary rounded-4 px-3 opacity-75" href="/dashboard">skip<i class="my-1 ps-1 bi bi-arrow-right" /></a>
                        </div>


                        <div className="">
                            <h3 className="fw-bolder fs-2  m-3">Profile set up</h3>

                            <div class="card rounded-5 mb-2" style={{ maxWidth: "" }}>
                                <div class="card-content d-flex p-3">
                                    <div className="col-5">
                                        <img className="card-img rounded-5 cropped" src={(!file) ? p1 : URL.createObjectURL(file)} height="150" />
                                    </div>
                                    <div className="card-body">
                                        <p className="m-auto">
                                            <span class="placeholder col-8"></span>
                                            <span class="placeholder col-10"></span>
                                            <span class=" text-muted">Preview Profile Photo</span>


                                        </p>

                                    </div>

                                </div>

                            </div>
                            <div class="input-group shadow-none mb-3 px-3">
                                <input type="file" class="form-control shadow-none" id="inputGroupFile02" onChange={(e) => {
                                    const f = e.target.files[0];
                                    selectedFile(f);
                                }} />
                                <button class="input-group-text btn btn-primary" onClick={uploadProfileImage}>Upload
                                    <div className="spinner-border spinner-border-sm text-white mx-2"></div>
                                </button>
                            </div>



                        </div>
                        <div class="row pt-3 px-4">
                            <div class="col-md-6 mb-2">
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
                            <div class="col-md-6 mb-2">
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
                        <div class="pt-2 mb-4 mx-4">
                            <button class="btn btn-danger btn-lg" onClick={()=>{
                                if(profileInfo.fname !== "" && profileInfo.lname !== '' && profileInfo.profileImgURL!==''){
                                    profileRequest()
                                }

                            }} type="submit">Finish</button>
                        </div>
                    </div>

                </div>

            </div>
        </div>


    )
}
export default ProfileDetails;