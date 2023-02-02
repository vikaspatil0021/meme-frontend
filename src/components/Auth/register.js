import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import ProfileDetails from "./profile";
import * as bootstrap from "bootstrap"
import ProfileDetails2 from "./profile2";

const Register = () => {
  const navigate = useNavigate()

  const [Input, setInput] = useState({
    email: '',
    username: '',
    password: ''
  });
  const [profileImgUrl,setprofileImgUrl] = useState('')

  const ele1 = document.getElementById("register-button");
  const ele2 = document.getElementById("register-spinner");
  const ele3 = document.getElementById("register-arrow");




  //--------------Current Auth status------------
  useEffect(() => {
    axios.get(process.env.REACT_APP_SERVER_URL + "/isauth", { withCredentials: "include" })
      .then((res) => {
        if (res.data.isAuth) {
          navigate("/dashboard")
        }
      }).catch((err) => {
        console.log(err);
      })
  }, [])

  //--------Register user--------
  const registerRequest = async () => {
    const lowereduser = (Input.username).toLowerCase();
    const dataToSend = {
      email: Input.email,
      username: lowereduser,
      password: Input.password
    }


    if (ele1.disabled == false) {
      ele2.classList.remove("d-none");
      ele3.classList.add("d-none");





      await axios.post(process.env.REACT_APP_SERVER_URL + '/register', dataToSend, { withCredentials: "include" })
        .then((res) => {
          ele2.classList.add("d-none");
          ele3.classList.remove("d-none");

          if (res.data.isAuth) {
            ele1.classList.replace("btn-danger", "btn-success");
            ele1.innerHTML = "Registered";

            setTimeout(() => {

              const carousel = new bootstrap.Carousel('#carouselControls')
              carousel.next()
            }, 500)
          }else{
            const toastLive = document.getElementById('liveToast-register');
            const toast = new bootstrap.Toast(toastLive)
            toast.show()


          }


        })
        .catch((error) => {
          console.log(error);
        });
    }

  }


  //function to get the profile image url from profile.js
  const getImgUrl= (imgUrl)=>{
    setprofileImgUrl(imgUrl);
  }

  if (Input.email !== "" && Input.username !== '' && Input.password !== '') {
    ele1.disabled = false

  } else {
    if (ele1) {

      ele1.disabled = true
    }
  }
  return (
    <div>
      <div>
        <div className="quickLinks sticky-top bg-white px-2 py-2">
          <div className=" d-flex ms-2 ms-md-3">
            <div className=" mx-auto" style={{ width: "1370px" }}>

              <a href="/" class="btn btn-primary me-1 rounded-4 opacity-75 px-3 fw-semibold"><i class="my-1 pe-1 bi bi-arrow-left" /><i class=" my-1 bi bi-house-door" /></a>
              <a href="/stories" class="btn btn-primary rounded-4 opacity-75 px-3 fw-semibold me-1"><i class="my-1 pe-1 bi bi-arrow-left" />Stories</a>

              <a href="/people" class="btn btn-primary rounded-4 opacity-75 px-3 fw-semibold"><i class="my-1 pe-1 bi bi-arrow-left" />People</a>
            </div>

          </div>


        </div>
        <div className="d-flex justify-content-center">
        <div class="toast-container position-fixed bottom-0 p-3">

        <div id="liveToast-register" class="toast align-items-center bg-danger" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="d-flex">
            <div class="toast-body text-white">
              Username already taken
            </div>
            <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
        </div>
        </div>


        <div id="carouselControls" class="carousel slide" data-bs-touch="false">
          <div class="carousel-inner">
            <div class="carousel-item active">

              <div className=" m-2 p-2 mx-md-3 px-md-3">
                <div className="mt-4 d-flex justify-content-center">

                  <form className="col-lg-3 col-md-5">

                    <h3 class="fw-normal mb-3 pb-3">Register</h3>

                    <div class="form-outline mb-4">
                      <label class="form-label" for="formEmail">Email address *</label>
                      <input autoFocus required type="email" name="email" id="formEmail" class="form-control form-control-lg" value={Input.email} onChange={(event) => {
                        setInput({
                          email: event.target.value,
                          username: Input.username,
                          password: Input.password
                        })
                      }} />
                    </div>
                    <div class="form-outline mb-4">
                      <label class="form-label" for="formUsername">Username *</label>
                      <input required type="text" name="username" id="formUsername" class="form-control form-control-lg" value={Input.username} onChange={(event) => {
                        setInput({
                          email: Input.email,
                          username: event.target.value,
                          password: Input.password
                        })
                      }} />
                    </div>


                    <div class="form-outline mb-4">
                      <label class="form-label" for="formPassword">Password *</label>
                      <input required type="password" name="password" id="formPassword" class="form-control form-control-lg" value={Input.password} onChange={(event) => {
                        setInput({
                          email: Input.email,
                          username: Input.username,
                          password: event.target.value
                        })
                      }} />
                    </div>

                    <div class="d-flex flex-wrap justify-content-center pb-4">
                      <div className="w-100" onClick={registerRequest}>

                        <button id="register-button" class="btn btn-danger btn-lg w-100 rounded-4"
                          type="button" disabled>Register
                          <div id="register-spinner" className="spinner-border spinner-border-sm text-white mx-2 d-none"></div>

                          <i id="register-arrow" class="my-1 ps-1 bi bi-arrow-right" /></button>
                      </div>


                    </div>


                    <p className="w-100 d-block">Already have an account? <a href="/login" class="link-danger">Login here</a></p>

                  </form>
                </div>

              </div>
            </div>


            <div class="carousel-item">
              <ProfileDetails getImgUrl={getImgUrl} />



            </div>
            <div class="carousel-item">
              <ProfileDetails2 profileImgUrl={profileImgUrl} />



            </div>

          </div>

        </div>


      </div>
    </div>
  )

}

export default Register;