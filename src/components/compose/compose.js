import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Compose = () => {
    const navigate = useNavigate();
    const [post, setPost] = useState({
        title: '',
        content: '',
        imageURL:''
    })

    const [fileSelected, setFileSelected] = useState('')

    //--------------Current Auth status----------
    useEffect(() => {
        axios.get(SERVER_URL + "/isauth", { withCredentials: true })
            .then((res) => {
                if (!(res.data.isAuth)) {
                    navigate("/login")
                }
            }).catch((err) => {
                console.log(err);
            })
    }, [])

    //post request to image upload to cloudinary ------------------
    const uploadImage =()=>{

    
        const formData = new FormData();
        formData.append("file", fileSelected[0]);
        formData.append("upload_preset","ne5lxezf")
        axios.post("https://api.cloudinary.com/v1_1/dt55mivpf/image/upload", formData)
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
    const createPost = (e) => {

        e.preventDefault();
        if (post.title !== "" && post.content !== '' && post.imageURL!=='') {
            console.log(post)
        //post request to send post data to backend----------------------
            axios.post(SERVER_URL + '/compose', post, { withCredentials: true })
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
            <div className="mt-lg-5 pt-lg-5 mx-lg-5 px-lg-5 mt-5 pt-5 m-2 p-2 mx-md-3 px-md-3">
                <div className="mt-5 d-flex justify-content-center">

                    <form style={{ width: "65%" }} method="POST">

                        <h3 class="fw-normal mb-3 pb-3">Compose</h3>

                        <input type="file" name="postImage" onChange={(e) => { setFileSelected(e.target.files) }} />
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
                        </div>

                    </form>
                </div>
            </div>
        </div>

    );

}

export default Compose;