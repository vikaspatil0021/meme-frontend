import React, { useState } from "react";
import p1 from "../img/p1.png"

const ProfileDetails = () => {
    const [file, selectedFile] = useState();
    return (
        <div>


            <div className="mx-lg-5 px-lg-5  m-2 p-2 mx-md-3 px-md-3">
                <div className="d-flex justify-content-center">

                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="">

                            <a className="btn float-end border-0 btn-primary rounded-4 px-3 opacity-75" href="/dashboard">skip<i class="my-1 ps-1 bi bi-arrow-right" /></a>
                        </div>


                        <div className="mt-5">
                            <h3 className="fw-bolder fs-2  m-3">Profile set up</h3>

                            <div class="card rounded-5 mb-2" style={{maxWidth:""}}>
                                <div class="card-content d-flex p-3">
                                    <div className="col-5">
                                        <img className="card-img rounded-5 cropped" src={(!file) ? p1 : URL.createObjectURL(file)} height="150" />
                                    </div>
                                    <div className="card-body">
                                        <p className="m-auto">
                                            <span class="placeholder col-8"></span>
                                            <span class="placeholder col-10"></span>
                                            <span class="fs-4 text-muted">Preview Profile Photo</span>


                                        </p>

                                    </div>

                                </div>

                            </div>
                            <div class="input-group shadow-none mb-3">
                                <input type="file" class="form-control shadow-none" id="inputGroupFile02" onChange={(e) => {
                                    const f = e.target.files[0];
                                    selectedFile(f);
                                }} />
                                <button class="input-group-text btn btn-primary" on>Upload
                                <div className="spinner-border spinner-border-sm text-white mx-2"></div>
                                </button>
                            </div>
                            <div class="pt-1 mb-4">
                                <button class="btn btn-danger btn-lg float-end" data-bs-target="#carouselControls"
                                    data-bs-slide="next" type="submit">Finish</button>
                            </div>


                        </div>
                    </div>

                </div>

            </div>
        </div>


    )
}
export default ProfileDetails;