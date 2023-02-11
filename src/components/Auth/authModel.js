import React from "react";
import "./authModel.css"

const AuthModel = () => {
    return (
        <div className="">
            <div class="modal fade pt-5 mt-5 aniModal" id='authModel' tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content rounded-5">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5 px-3" id="exampleModalLabel">Blog</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                        </div>
                        <div class="modal-body d-flex justify-content-center">
                        <div className="">

                            <a type="button" href="/login" class="btn btn-primary d-block rounded-5 my-2 fs-4 px-5">Login</a>
                            <a type="button" href="/register" class="btn btn-danger rounded-5 my-2 fs-4 px-5" >Register</a>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AuthModel;