import axios from "axios";
import React, { useState } from "react";
import p1 from "../img/p1.png"
import * as bootstrap from "bootstrap"

const ProfileDetails = (props) => {

    const [file, selectedFile] = useState('');

    // elemnts by ids------------------
    const ele1 = document.getElementById("upload-spinner");
    
    const ele2 = document.getElementById("choose-photo");
    // const ele3 = document.getElementById("next-button");
    const ele4 = document.getElementById("upload-button");
    const ele5 = document.getElementById("upload-check-icon");

    
    const uploadProfileImage = async () => {
        ele1.classList.remove("d-none");


        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "gkcutnp6")
        await axios.post("https://api.cloudinary.com/v1_1/dt55mivpf/image/upload", formData)
            .then((res) => {
                props.getImgUrl(res.data.url);
                // ele3.disabled = false;
                ele2.disabled = true;
                ele1.classList.add("d-none");
                ele4.classList.replace("btn-primary","btn-success");
                ele4.innerHTML="Uploaded";
                ele4.disabled=true;
                ele5.classList.remove("d-none");

                setTimeout(() => {

                    const carousel = new bootstrap.Carousel('#carouselControls')
                    carousel.next()
                  }, 500)
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
                            <h3 className="fw-bolder fs-2  m-3">Profile photo</h3>

                            <div class="card rounded-5 mb-2">
                                <div class="card-content d-flex p-3">
                                    <div className="col-5">
                                        <img className="card-img rounded-5 cropped" src={(!file) ? p1 : URL.createObjectURL(file)} height="150" />
                                    </div>
                                    <div  className="card-body d-flex flex-wrap justify-content-center align-items-center">
                                    <span class="position-absolute btn mx-4 btn-primary rounded-4 opacity-75">{file==""?"Choose photo":"Change photo"}</span>
                                        <input id="choose-photo" type="file" accept="image/gif, image/jpeg, image/png" class="form-control form-control-lg opacity-0" onChange={(e) => {
                                            const f = e.target.files[0];
                                            selectedFile(f);
                                        }} />

                                    </div>

                                </div>

                            </div>
                            <div className="d-flex flex-wrap justify-content-center">

                            <button id="upload-button" class="btn btn-lg btn-primary m-2 w-100 rounded-4" onClick={uploadProfileImage}>Upload
                                <div id="upload-spinner" className="spinner-border spinner-border-sm text-white mx-2 d-none"></div>

                                <i id="upload-check-icon" class="bi bi-check-circle-fill mx-2 d-none"></i>
        
                            </button>
                            </div>





                        </div>
                        
                        {/* <div class="d-flex flex-wrap justify-content-center float-bottom fw-bolder pt-4">
                        <div className="w-100 mx-1">

                            <button id="next-button" class="btn btn-danger btn-lg w-100 rounded-4" type="button"  data-bs-target="#carouselControls" data-bs-slide="next" disabled>Almost there
                            <i class="my-1 ps-1 bi bi-arrow-right" /></button>
                        </div>
                        </div> */}

                    </div>

                </div>

            </div>
        </div>


    )
}
export default ProfileDetails;