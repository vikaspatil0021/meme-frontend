import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import Nav from "../Header/header";

const Register = () => {
  const navigate = useNavigate()
  const [name, setName] = useState({
    fname: '',
    lname: ''
  });
  const [Input, setInput] = useState({
    email:'',
    username: '',
    password: ''
  });

  //--------------Current Auth status------------
  useEffect(() => {
    axios.get(process.env.REACT_APP_SERVER_URL + "/isauth", { withCredentials: true })
      .then((res) => {
        if (res.data.isAuth) {
          navigate("/stories")
        }
      }).catch((err) => {
        console.log(err);
      })
  }, [])

  //--------Register user--------
  const registerRequest = (e) => {
    e.preventDefault()
    const user = {
      fullName: name.fname + " " + name.lname,
      email:Input.email,
      username: Input.username,
      password: Input.password
    }

    axios.post(process.env.REACT_APP_SERVER_URL + '/register', user, { withCredentials: true })
      .then((res) => {
        if (res.data.isAuth) {
          navigate("/dashboard");
        } else {
          console.log(res);

        }
      })
      .catch((error) => {
        console.log(error);
      });

  }
  return (
    <div>
      <div>
        <div className="mt-lg-5 pt-lg-5 mx-lg-5 px-lg-5 mt-5 pt-5 m-2 p-2 mx-md-3 px-md-3">
          <div className="mt-4 d-flex justify-content-center">

            <form style={{ width: "40%" }}>

              <h3 class="fw-normal mb-3 pb-3">Register</h3>
              <div class="row">
                <div class="col-md-6 mb-4">
                  <div class="form-outline">
                    <label class="form-label" for="formFname">First name</label>
                    <input autoFocus required type="text" name="fname" id="formFname" class="form-control" value={name.fname} onChange={(event) => {
                      setName({
                        fname: event.target.value,
                        lname: name.lname
                      })
                    }} />
                  </div>
                </div>
                <div class="col-md-6 mb-4">
                  <div class="form-outline">
                    <label class="form-label" for="formLname">Last name</label>
                    <input required type="text" id="formLname" class="form-control" value={name.lname} onChange={(event) => {
                      setName({
                        fname: name.fname,
                        lname: event.target.value
                      })
                    }} />
                  </div>
                </div>
              </div>
              <div class="form-outline mb-4">
                <label class="form-label" for="formUsername">Username</label>
                <input required type="text" name="username" id="formUsername" class="form-control form-control-lg" value={Input.username} onChange={(event) => {
                  setInput({
                    email:Input.email,
                    username: event.target.value,
                    password: Input.password
                  })
                }} />
              </div>
              <div class="form-outline mb-4">
                <label class="form-label" for="formEmail">Email address</label>
                <input required type="email" name="email" id="formEmail" class="form-control form-control-lg" value={Input.email} onChange={(event) => {
                  setInput({
                    email: event.target.value,
                    username:Input.username,
                    password: Input.password
                  })
                }} />
              </div>

              <div class="form-outline mb-4">
                <label class="form-label" for="formPassword">Password</label>
                <input required type="password" name="password" id="formPassword" class="form-control form-control-lg" value={Input.password} onChange={(event) => {
                  setInput({
                    email:Input.email,
                    username: Input.username,
                    password: event.target.value
                  })
                }} />
              </div>

              <div class="pt-1 mb-4">
                <button class="btn btn-danger btn-lg btn-block" onClick={registerRequest} type="submit">Register</button>
              </div>
              
              <p>Already have an account? <a href="/login" class="link-danger">Login here</a></p>

            </form>
          </div>

        </div>

      </div>
    </div>
  )

}

export default Register;