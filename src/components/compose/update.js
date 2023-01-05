import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UpdateStory = (props) => {
    const navigate = useNavigate();
    console.log(props.rStory)
    
    const { _id, title, content } = props.rStory
    const [updatepost, setupdatePost] = useState({
        title: title,
        content: content
    })
    console.log(updatepost);

    //--------------Current Auth status----------
    useEffect(() => {
        if((props.rStory)===''){
            navigate("/dashboard")
        }
        
        axios.get("http://localhost:5000/isauth", { withCredentials: true })
            .then((res) => {
                if (!(res.data.isAuth)) {
                    navigate("/login")
                }
            }).catch((err) => {
                console.log(err);
            })
    }, [])

    //----------create a story post by posting the recieved data---------
    const updatePost = (e) => {

        if (updatepost.title !== "" && updatepost.content !== '') {
            axios.put('http://localhost:5000/updateStory', { Id: _id, ...updatepost }, { withCredentials: true })
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
            <div className="mt-lg-5 pt-lg-5 mx-lg-5 px-lg-5 mt-5 pt-5 m-2 p-2 mx-md-3 px-md-3">
                <div className="mt-5 d-flex justify-content-center">

                    <form style={{ width: "65%" }}>

                        <h3 class="fw-normal mb-3 pb-3">Update story</h3>

                        <div class="form-outline mb-4">
                            <label class="form-label" for="formPostName">Title</label>
                            <input autoFocus required type="text" name="postName" id="formPostName" class="form-control form-control-lg" onChange={(e) => { setupdatePost({ title: e.target.value, content: updatepost.content }) }} value={updatepost.title} />
                        </div>

                        <div class="form-outline mb-4">
                            <label class="form-label" for="formPostContent">Content</label>
                            <textarea class="form-control" id="formPostContent" name="postContent" placeholder="Type more than 50 characters..." minlength="50" rows="7" required onChange={(e) => { setupdatePost({ title: updatepost.title, content: e.target.value }) }} value={updatepost.content} />
                        </div>

                        <div class="pt-1 mb-4">
                            <a class="btn btn-danger btn-lg btn-inline me-2" href="/dashboard" type="submit">Cancel</a>
                            <a class="btn btn-danger btn-lg btn-inline" data-bs-toggle="modal" data-bs-target={"#a" + _id}>Update</a>

                            {/* <!-- Modal --> */}
                            <div class="modal fade" id={"a" + _id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="exampleModalLabel">{title} will be updated</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-footer">
                                            <a type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</a>
                                            <a href="/dashboard" type="button" class="btn btn-primary" onClick={()=>{updatePost()}}>Update</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </form>
                </div>
            </div>
        </div>

    );

}

export default UpdateStory;