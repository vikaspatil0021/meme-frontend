import React from "react";
import "./storyCard.css"

const StoryCard = (props) => {

    const { _id, title, imageURL,content,likes } = props.sentStory;
    if(props.user){

        var {_id:sessionId} = props.user;
    }
    const like = (likes.includes(sessionId))?"bi-heart-fill" : "bi-heart";


    return (
        <div className="p-1 p-md-2 col-12 col-md-6 col-lg-4">
            
            <a href={"/stories/" + _id} class="card-link">
                <div class="card Storycard rounded-5 mb-2">
                    <div class="card-content p-3 pb-0">
                        <img class="card-img rounded-5 cropped" src={imageURL} alt="Card image cap" height="300" />
                        <div class="card-body text-dark">
                            <h4 class="card-title overflow-text">{title}</h4>
                            <p class="card-text overflow-text">{content}</p>
                            <div className="d-inline-flex">

                            <i class={"bi "+like+" mx-2 d-inline fs-5 text-danger"} />
                            <h5 className="fw-lighter">{likes.length}</h5>
                            </div>

                        </div>
                    </div>
                </div>
            </a>


        </div>


    );
}

export default StoryCard;