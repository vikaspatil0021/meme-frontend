import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Preloader from "../preLoader/preloader";
import uploadMeme from "../img/uploadMeme.png"
import * as bootstrap from "bootstrap"


const Compose = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [post, setPost] = useState({
        title: '',
        content: '',
        imageURL: ''
    })

    const [fileSelected, setFileSelected] = useState('')

    // elemnts by ids------------------
    const ele1 = document.getElementById("upload-spinner-compose");
    const ele2 = document.getElementById("upload-button-compose");

    const ele3 = document.getElementById("publish-spinner-compose");
    const ele4 = document.getElementById("publish-button-compose");


    //--------------Current Auth status----------
    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL + "/isauth", { withCredentials: "include" })
            .then((res) => {
                setLoading(res.data.isAuth);

                if (!(res.data.isAuth)) {
                    navigate("/login")
                }
            }).catch((err) => {
                console.log(err);
            })
    }, [])

    //post request to image upload to cloudinary ------------------
    const uploadImage = async () => {
        ele1.classList.remove("d-none");


        const formData = new FormData();
        formData.append("file", fileSelected);
        formData.append("upload_preset", "ne5lxezf")
        await axios.post("https://api.cloudinary.com/v1_1/dt55mivpf/image/upload", formData)
            .then((res) => {
                ele1.classList.add("d-none");
                ele2.classList.replace("btn-primary", "btn-success");
                ele2.innerHTML = "Uploaded";

                setPost({ title: post.title, content: post.content, imageURL: res.data.url })

                setTimeout(() => {

                    const carousel = new bootstrap.Carousel('#carouselControls-compose')
                    carousel.next()
                }, 800)
                console.log(res.data.url);

            })
            .catch((error) => {
                ele1.classList.add("d-none");
                uploadImage()
                console.log(error);

            });


    }
    console.log(post);


    //----------create a story post by posting the recieved data---------
    const createPost = async (e) => {

        e.preventDefault();
        if (ele4.disabled == false) {
            ele3.classList.remove("d-none");
            if (post.title !== "" && post.content !== '' && post.imageURL !== '') {
            console.log(post)
            //post request to send post data to backend----------------------
            await axios.post(process.env.REACT_APP_SERVER_URL + '/compose', post, { withCredentials: "include" })
                .then((res) => {
                    ele3.classList.add("d-none");
                ele4.classList.replace("btn-primary", "btn-success");
                ele4.innerHTML = "Published";
                    console.log(res.data);
                    setTimeout(() => {

                        navigate("/memes")
                      }, 800)

                })
                .catch((error) => {
                    ele1.classList.add("d-none");
                    createPost()
                    console.log(error);

                });
        }
    }

    }

    if (post.title !== "" && post.content !== '') {
        ele4.disabled = false
    
      } else {
        if (ele4) {
    
          ele4.disabled = true
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
            {loading ?
                (
                    <div className="mx-lg-5 px-lg-5 mx-md-3 px-md-3 px-3">
                        <div className="pt-4 d-flex justify-content-center">

                            <div className="col-12 col-md-6 col-lg-4">

                                <h3 class="fw-semibold mb-3 ms-3">Compose</h3>
                                <div id="carouselControls-compose" class="carousel slide" data-bs-touch="false">
                                    <div class="carousel-inner">
                                        <div class="carousel-item active">
                                            <div class="card rounded-5 mb-2">
                                                <div class="card-content d-flex flex-wrap justify-content-center p-3 pb-0">
                                                    <img className="card-img rounded-5 cropped" src={(!fileSelected) ? uploadMeme : URL.createObjectURL(fileSelected)} height="300" />

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
                                   
                                        </div>
                                        <div class="carousel-item">
                                            <div className=" mx-2 px-2 mx-md-3 px-md-3">
                                                <div className="mt-4 d-flex justify-content-center"></div>

                                                <div class="form-outline mb-4">
                                                    <label class="form-label" for="formPostName">Title for your meme*</label>
                                                    <input autoFocus required type="text" name="postName" id="formPostName" placeholder="Sigma meme..." class="form-control form-control-lg" onChange={(e) => { setPost({ title: e.target.value, content: post.content, imageURL: post.imageURL }) }} value={post.title} />
                                                </div>

                                                <div class="form-outline mb-4">
                                                    <label class="form-label" for="formPostContent">Description and hashtags*</label>
                                                    <textarea class="form-control form-control-lg" id="formPostContent" name="postContent" placeholder="#meme..." rows="3" required onChange={(e) => { setPost({ title: post.title, content: e.target.value, imageURL: post.imageURL }) }} value={post.content} />
                                                </div>
                                                <div class="d-flex flex-wrap justify-content-center">
                                                    <div className="w-100 mx-2" onClick={createPost}>

                                                        <button id="publish-button-compose" class="btn btn-primary btn-lg w-100 rounded-4"
                                                            type="button" disabled>Publish
                                                            <div id="publish-spinner-compose" className="spinner-border spinner-border-sm text-white mx-2 d-none"></div>
                                                        </button>
                                                    </div>


                                                </div>
                                     
                                            </div>
                                        </div>

                                    </div>
                                </div>






                            </div>
                        </div>
                    </div>
                ) : <Preloader />}

        </div>

    );

}

export default Compose;