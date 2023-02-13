import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as bootstrap from "bootstrap";

const UpdateStory = (props) => {
    const navigate = useNavigate();
    console.log(props.rStory)

    const { _id, title, content, imageURL } = props.rStory
    const [updatepost, setupdatePost] = useState({
        title: title,
        content: content,
        imageURL: imageURL

    })
    console.log(updatepost);

    const [fileSelected, setFileSelected] = useState('')

    //--------------Current Auth status----------
    useEffect(() => {
        if ((props.rStory) === '') {
            navigate("/dashboard")
        }

        axios.get(process.env.REACT_APP_SERVER_URL + "/isauth", { withCredentials: "include" })
            .then((res) => {
                if (!(res.data.isAuth)) {
                    navigate("/login")
                }
            }).catch((err) => {
                console.log(err);
            })
    }, [])

    const ele1 = document.getElementById("upload-spinner-compose");
    const ele2 = document.getElementById("upload-button-compose");

    const uploadImage = async (e) => {


        if (imageURL == updatepost.imageURL) {
            ele1.classList.remove("d-none");

            const formData = new FormData();
            formData.append("file", fileSelected);
            formData.append("upload_preset", "ne5lxezf")
            await axios.post("https://api.cloudinary.com/v1_1/dt55mivpf/image/upload", formData)
                .then((res) => {
                    ele1.classList.add("d-none");
                    ele2.classList.replace("btn-primary", "btn-success");
                    ele2.innerHTML = "Uploaded";
                    ele2.disabled = true
                    setupdatePost({ title: updatepost.title, content: updatepost.content, imageURL: res.data.url })


                    console.log(res.data.url);

                })
                .catch((error) => {
                    ele1.classList.add("d-none");

                    console.log(error);

                });
        }



    }

    //----------create a story post by posting the recieved data---------
    const updatePost = async () => {

        if (updatepost.title !== "" && updatepost.content !== '' && updatePost.imageURL!=='') {
            await axios.put(process.env.REACT_APP_SERVER_URL + '/updateStory', { Id: _id, ...updatepost }, { withCredentials: true })
                .then((res) => {
                    console.log(res.data);
                })
                .catch((error) => {
                    console.log(error);

                });
        }
    }


    return (
        <div>
            <div className="quickLinks sticky-top bg-white px-2 py-2">
                <div className=" d-flex ms-2 ms-md-3">
                    <div className=" mx-auto" style={{ width: "1370px" }}>

                        <a href="/" class="btn btn-primary me-1 rounded-4 opacity-75 px-3 fw-semibold"><i class="my-1 pe-1 bi bi-arrow-left" /><i class=" my-1 bi bi-house-door" /></a>
                        <a href="/dashboard" class="btn btn-primary rounded-4 opacity-75 px-3 fw-semibold me-1"><i class="my-1 pe-1 bi bi-arrow-left" />Dashboard</a>

                    </div>

                </div>


            </div>
            <div className="mx-lg-5 d-flex   justify-content-center px-lg-5 mx-md-3 px-md-3 px-3 ">
                <div className="mt-4 col-12 col-md-6 col-lg-4">

                    <div>

                        <h3 class="fw-semibold ms-3 mb-3">Update story</h3>

                        <div class="card rounded-5 mb-2">
                            <div class="card-content d-flex flex-wrap justify-content-center p-3 pb-0">
                                <img className="card-img rounded-5 cropped" src={(!fileSelected) ? imageURL : URL.createObjectURL(fileSelected)} height="300" />

                                <div className="col-6 card-body d-flex flex-wrap justify-content-center align-items-center">
                                    <span class="position-absolute btn btn-primary rounded-4 opacity-75">{fileSelected == "" ? "Choose image" : "Change image"}</span>

                                    <input id="choose-photo-compose" type="file" accept="image/jpeg, image/png, image/jpg, image/gif" class="form-control opacity-0" style={{ width: "130px" }} onChange={(e) => {
                                        const f = e.target.files[0];
                                        setFileSelected(f);
                                    }} />

                                </div>

                            </div>

                        </div>
                        <div className="d-flex flex-wrap justify-content-center">

                            <button id="upload-button-compose" class="btn btn-lg btn-primary m-2 w-100 rounded-4" onClick={uploadImage}>Upload
                                <div id="upload-spinner-compose" className="spinner-border spinner-border-sm text-white mx-2 d-none"></div>


                            </button>
                        </div>

                        <div class="form-outline mb-4 mt-3 mx-2">
                            <label class="form-label" for="formPostName">Title</label>
                            <input autoFocus required type="text" name="postName" id="formPostName" class="form-control form-control-lg" onChange={(e) => { setupdatePost({ title: e.target.value, content: updatepost.content, imageURL: updatepost.imageURL }) }} value={updatepost.title} />
                        </div>

                        <div class="form-outline mb-4 mx-2">
                            <label class="form-label" for="formPostContent">Description and hashtags</label>
                            <textarea class="form-control form-control-lg" id="formPostContent" name="postContent" rows="3" required onChange={(e) => { setupdatePost({ title: updatepost.title, content: e.target.value, imageURL: updatepost.imageURL }) }} value={updatepost.content} />
                        </div>

                        <div class="pt-1 mb-4">
                            <div class="d-flex flex-wrap justify-content-center">
                                <div className="w-100 m-2">

                                    <button id="publish-button-compose" data-bs-toggle="modal" data-bs-target={"#a" + _id} class="btn btn-primary btn-lg w-100 rounded-4"
                                        type="button">Update
                                    </button>
                                </div>


                            </div>
                            <div class="d-flex flex-wrap justify-content-center">
                                <div className="w-100 mx-2">

                                    <a href="/dashboard" id="publish-button-compose" class="btn btn-danger btn-lg w-100 rounded-4"
                                        type="button">Cancel
                                    </a>
                                </div>


                            </div>

                            {/* <!-- Modal --> */}
                            <div class="modal fade" id={"a" + _id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content rounded-5">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5 ms-3" id="exampleModalLabel">{title} will be updated</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-footer">
                                            <a type="button" class="btn btn-secondary rounded-4" data-bs-dismiss="modal">Cancel</a>
                                            <a href="/dashboard" type="button" class="btn btn-primary rounded-4" onClick={() => { updatePost() }}>Update</a>
                                        </div>
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

export default UpdateStory;