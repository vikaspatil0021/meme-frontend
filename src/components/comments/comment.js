import axios from "axios";
import React, { useEffect, useState } from "react";
import AuthModel from "../Auth/authModel";


const Comments = (props) => {

    const user = props.user;
    const { _id: userId, name, username } = user;

    const [newComment, setNewComment] = useState('');
    const [replyContent, setReplyContent] = useState('');

    const [sentComments, setSentComments] = useState([]);

    console.log(props.auth);


    useEffect(() => {
        axios.get(SERVER_URL + "/comments/" + props.storyId, { withCredentials: true })
            .then((res) => {
                setSentComments(res.data);
            }).catch((err) => {
                console.log(err);
            })
    }, [])

    const saveComment = () => {
        const sendComment = {
            user: {
                userId: userId,
                name: name,
                username: username
            },
            storyId: props.storyId,
            content: newComment,


        }
        if (newComment !== '') {

            axios.post(SERVER_URL + '/comment', sendComment, { withCredentials: true })
                .then((res) => {
                    console.log(res.data);


                })
                .catch((error) => {
                    console.log(error);

                });
        }



    }

    const replyCommentHandller = ({ commentId, replyArray }) => {
        console.log(commentId);
        const replyCommentObject = {
            user: {
                userId: userId,
                name: name,
                username: username
            },
            content: replyContent,
            commentId: commentId,
            replyArray: replyArray,
            msg:"ADD"


        }

        if (replyContent !== '') {

            axios.put(SERVER_URL + '/replyComment', replyCommentObject, { withCredentials: true })
                .then((res) => {
                    console.log(res.data);


                })
                .catch((error) => {
                    console.log(error);

                });
        }

    }
    const deleteComment = (commentId) => {
        console.log(commentId);
        axios.delete(SERVER_URL + "/deletecomment", { data: { Id: commentId }, withCredentials: true })
            .then((res) => {
                console.log(res.data);
            }).catch((err) => {
                console.log(err);
            });

    }
    const deleteReplyComment = ({commentId,replyId}) =>{

        const replyCommentObject = {
            
            commentId: commentId,
            replyId:replyId,
            msg:"REMOVE"


        }
        axios.put(SERVER_URL + "/replyComment", replyCommentObject, {withCredentials: true })
            .then((res) => {
                console.log(res.data);
            }).catch((err) => {
                console.log(err);
            });
    }

    return (
        <div id="comments" className="m-2">
            <div class="card storyPage rounded-5 my-3 p-1 p-md-4 p-lg-5 pt-lg-3">
                <div className="card-content p-1 py-3 p-lg-5 pt-lg-3">

                    <div className="d-flex justify-content-center">

                        <h3 className="fw-bold">Comments</h3>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button className="px-3 btn btn-primary rounded-4" data-bs-toggle="modal" data-bs-target={"#" + ((props.auth) ? "newComment" : "authModel")}>New comment
                            <i class="bi bi-plus-circle-fill ps-2"></i>
                        </button>

                    </div>
                    <AuthModel />


                    {/* //-------------new comment modal from bootstrap----------- */}
                    <div class="modal fade aniModal" id="newComment" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog my-5">
                            <div class="modal-content rounded-5">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5 mx-3" id="exampleModalLabel">New comment</h1>
                                </div>
                                <div class="modal-body d-flex">
                                    <img src="https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/caroline-byline-compressor.png?width=48&height=48&name=caroline-byline-compressor.png" className=" rounded-5 cropped me-2" alt="card_img" height="40" width="40" />

                                    <textarea autoFocus required type="text" name="comment" id="comment" class="form-control form-control-lg" rows="3" onChange={(e) => { setNewComment(e.target.value) }} value={newComment} />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" class="btn btn-danger rounded-4 float-end" data-bs-dismiss="modal">Cancel</button>
                                    <a type="button" href={(newComment !== '') ? ("/stories/" + props.storyId) : "#comments"} class="btn btn-primary rounded-4 float-end me-3" onClick={saveComment}>Publish</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {sentComments.map((comment) =>
                    (
                        <div>
                            <hr className="mx-auto" />

                            <div className="">
                                <div>
                                    <a href={"/people/" + comment.user.username} className="text-decoration-none d-inline-flex">
                                        <div className="card d-inline border-0 p-1 pb-0 rounded-4">

                                            <img src="https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/caroline-byline-compressor.png?width=48&height=48&name=caroline-byline-compressor.png" className=" rounded-5 cropped me-2" alt="card_img" height="40" width="40" />

                                            <span className="colorChange fs-5 fw-bold">{comment.user.name}</span>
                                        </div>
                                    </a>
                                    <div className="d-inline dropstart">

                                        <button className="rounded-5 border-0 float-end drop-button-comment" data-bs-toggle="dropdown">

                                            <i class="bi bi-three-dots fs-4 float-end"></i>
                                        </button>
                                        <ul className="p-2 dropdown-menu rounded-4">

                                            <li><a className="btn btn-primary py-2 rounded-4 dropdown-item" href="#" data-bs-toggle="modal" data-bs-target={"#" + ((props.auth) ? ("reply" + comment._id) : "authModel")}>Reply</a></li>
                                            {(userId === comment.user.userId) ? <li><a className=" btn btn-danger py-2 rounded-4 dropdown-item" href="#" data-bs-toggle="modal" data-bs-target={"#a" + comment._id}>Delete</a></li> : null}

                                        </ul>
                                    </div>
                                </div>
                                <span className="d-block ms-5 ps-1">{comment.content}</span>

                            </div>
                            {/* //-------------delete comment modal from bootstrap----------- */}
                            <div class="modal fade aniModal" id={"a" + comment._id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog my-5">
                                    <div class="modal-content rounded-5">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5 px-3" id="exampleModalLabel">This comment will be deleted permanentally</h1>
                                        </div>
                                        <div class="modal-footer">
                                            <a type="button" class="btn btn-primary rounded-4" data-bs-dismiss="modal">Cancel</a>
                                            <a type="button" href={"/stories/" + props.storyId} class="btn btn-danger rounded-4" onClick={() => { deleteComment(comment._id) }}>Delete</a>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            {/* //-------------reply comment modal from bootstrap----------- */}

                            <div class="modal fade aniModal" id={"reply" + comment._id} tabindex="-1" aria-labelledby="exampleLabel" aria-hidden="true">
                                <div class="modal-dialog my-5">
                                    <div class="modal-content rounded-5">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5 mx-3" id="exampleModalLabel">Reply comment</h1>
                                        </div>
                                        <div class="modal-body d-flex">
                                            <img src="https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/caroline-byline-compressor.png?width=48&height=48&name=caroline-byline-compressor.png" className=" rounded-5 cropped me-2" alt="card_img" height="40" width="40" />

                                            <textarea autoFocus required type="text" name="comment" class="form-control form-control-lg" rows="3" onChange={(e) => { setReplyContent(e.target.value) }} value={replyContent} />
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" class="btn btn-danger rounded-4 float-end" data-bs-dismiss="modal">Cancel</button>
                                            <a type="button" href={(replyContent !== '') ? ("/stories/" + props.storyId) : "#comments"} class="btn btn-primary rounded-4 float-end me-3" onClick={() => { replyCommentHandller({ commentId: comment._id, replyArray: comment.reply }) }}>Reply</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {comment.reply.map((replyComment) =>
                            (
                                <div className=" ms-5 ms-md-4">
                                    <hr className="mx-auto" style={{ width: "95%" }} />
                                    <a href={"/people/" + replyComment.user.username} className="text-decoration-none d-inline-flex">
                                        <div className="card d-inline border-0 px-3 pb-0 rounded-4">

                                            <img src="https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/caroline-byline-compressor.png?width=48&height=48&name=caroline-byline-compressor.png" className=" rounded-5 cropped me-2" alt="card_img" height="40" width="40" />

                                            <span className="colorChange fs-5 fw-bold">{replyComment.user.name}</span>
                                        </div>
                                    </a>
                                    <div className="d-inline dropstart">

                                        <button className="rounded-5 border-0 float-end drop-button-comment me-4" data-bs-toggle="dropdown">

                                            <i class="bi bi-three-dots fs-4 float-end"></i>
                                        </button>
                                        <ul className="p-2 dropdown-menu rounded-4">

                                            <li><a className="btn btn-primary py-2 rounded-4 dropdown-item" href="#" data-bs-toggle="modal" data-bs-target={"#" + ((props.auth) ? ("reply" + comment._id) : "authModel")}>Reply</a></li>
                                            {(userId === replyComment.user.userId) ? <li><a className=" btn btn-danger py-2 rounded-4 dropdown-item" href="#" data-bs-toggle="modal" data-bs-target={"#a"+replyComment.replyId}>Delete</a></li> : null}

                                        </ul>
                                    </div>
                                    <span className="d-block ms-5 ps-3">{replyComment.content}</span>

                                    {/* //-------------delete reply comment modal from bootstrap----------- */}
                                    <div class="modal fade aniModal" id={"a"+replyComment.replyId} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog my-5">
                                            <div class="modal-content rounded-5">
                                                <div class="modal-header">
                                                    <h1 class="modal-title fs-5 px-3" id="exampleModalLabel">This reply will be deleted permanentally</h1>
                                                </div>
                                                <div class="modal-footer">
                                                    <a type="button" class="btn btn-primary rounded-4" data-bs-dismiss="modal">Cancel</a>
                                                    <a type="button" href={"/stories/" + props.storyId} class="btn btn-danger rounded-4" onClick={() => { deleteReplyComment({commentId:comment._id,replyId:replyComment.replyId}) }}>Delete</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            ))}



                        </div>

                    ))}




                </div>

            </div>
        </div>
    );
}
export default Comments;