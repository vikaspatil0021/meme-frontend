import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Preloader from "../preLoader/preloader";


const Compose = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [post, setPost] = useState({
        title: '',
        content: '',
        imageURL:''
    })

    const [fileSelected, setFileSelected] = useState('')

    //--------------Current Auth status----------
    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL + "/isauth", { withCredentials: "include" })
            .then((res) => {
                setLoading(res.data.isAuth);

                if (!(res.data.isAuth)) {
                    // navigate("/login")
                }
            }).catch((err) => {
                console.log(err);
            })
    }, [])
    if(!loading){
        setLoading(true)
    }

    //post request to image upload to cloudinary ------------------
    const uploadImage =async()=>{

    
        const formData = new FormData();
        formData.append("file", fileSelected[0]);
        formData.append("upload_preset","ne5lxezf")
        await axios.post("https://api.cloudinary.com/v1_1/dt55mivpf/image/upload", formData)
            .then((res) => {
                console.log(res.data.url);
                setPost({ title: post.title, content: post.content, imageURL:res.data.url})
                
            })
            .catch((error) => {
                console.log(error);
                
            });
        console.log(post);

            
    }

    //----------create a story post by posting the recieved data---------
    const createPost = async (e) => {

        e.preventDefault();
        if (post.title !== "" && post.content !== '' && post.imageURL!=='') {
            console.log(post)
        //post request to send post data to backend----------------------
            await axios.post(process.env.REACT_APP_SERVER_URL + '/compose', post, { withCredentials: "include" })
                .then((res) => {
                    console.log(res.data);
                    navigate("/stories")

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
              <a href="/stories" class="btn btn-primary rounded-4 opacity-75 px-3 fw-semibold me-1"><i class="my-1 pe-1 bi bi-arrow-left" />Memes</a>

              <a href="/people" class="btn btn-primary rounded-4 opacity-75 px-3 fw-semibold"><i class="my-1 pe-1 bi bi-arrow-left" />People</a>
            </div>

          </div>


        </div>
        {loading ?
                (
            <div className="mx-lg-5 px-lg-5 mx-md-3 px-md-3 px-3">
                <div className="pt-5 d-flex justify-content-center">

                <form className="col-12 col-md-6 col-lg-4">

                        <h3 class="fw-semibold mb-3 ms-3">Compose</h3>

                        <div class="card rounded-5 mb-2">
                                <div class="card-content p-3">
                                        <img className="card-img rounded-5 cropped"  height="300" />
                                    
                                    <div  className="card-body d-flex flex-wrap justify-content-center align-items-center">
                                    <span class="position-absolute btn mx-4 btn-primary rounded-4 opacity-75">{"Change photo"}</span>
                                        <input id="choose-photo" type="file" accept="image/jpeg, image/png, image/jpg" class="form-control form-control-lg opacity-0" onChange={(e) => {
                                            const f = e.target.files[0];
                                            // selectedFile(f);
                                        }} />

                                    </div>

                                </div>

                            </div>

                        {/* <input type="file" name="postImage" onChange={(e) => { setFileSelected(e.target.files) }} />
                        <button class="btn btn-danger btn-inline" onClick={uploadImage} type="button">upload</button>

                        <div class="form-outline mb-4">
                            <label class="form-label" for="formPostName">Title</label>
                            <input autoFocus required type="text" name="postName" id="formPostName" class="form-control form-control-lg" onChange={(e) => { setPost({ title: e.target.value, content: post.content, imageURL:post.imageURL}) }} value={post.title} />
                        </div>

                        <div class="form-outline mb-4">
                            <label class="form-label" for="formPostContent">Content</label>
                            <textarea class="form-control" id="formPostContent" name="postContent" placeholder="Type more than 50 characters..." minlength="50" rows="7" required onChange={(e) => { setPost({ title: post.title, content: e.target.value, imageURL:post.imageURL }) }} value={post.content} />
                        </div>

                        <div class="pt-1 mb-4">
                            <a href="/dashboard" class="btn btn-danger btn-lg btn-inline me-2">Cancel</a>

                            <button class="btn btn-danger btn-lg btn-inline" onClick={createPost} type="button">Publish</button>
                        </div> */}

                    </form>
                </div>
            </div>
            ) : <Preloader />}

        </div>

    );

}

export default Compose;