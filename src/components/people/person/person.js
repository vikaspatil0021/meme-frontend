import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Nav from "../../Header/header";
import Preloader from "../../preLoader/preloader";
import AuthModel from "../../Auth/authModel";
import "./person.css"


const Person = () => {
    const location = useLocation()
    const [personInfo, setPersonInfo] = useState({ story: {}, user: {}, sessionUser: {} });

    const [auth, setAuth] = useState('');
    const [loading, setLoading] = useState(false);
    console.log(personInfo);
    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL + location.pathname, { withCredentials: "include" })
            .then((res) => {
                setPersonInfo(res.data.foundUser);
                setLoading(true);

            }).catch((error) => {
                console.log(error);

            })

        axios.get(process.env.REACT_APP_SERVER_URL + "/isauth", { withCredentials: "include" })
            .then((res) => {
                setAuth(res.data.isAuth)
            }).catch((err) => {
                console.log(err);
            })

    }, []);

    const { username, name } = personInfo;

    return (
        <div>
            <AuthModel />
            <div className="sticky-top" >

                <div className=" bg-white quickLinks px-2 py-2">
                    <div className="d-flex ms-2 ms-md-3">
                        <div className="mx-auto" style={{ width: "1370px" }}>

                            <a href="/" class="btn btn-primary me-1 rounded-4 opacity-75 px-3 fw-semibold"><i class=" my-1 bi bi-house-door" /></a>
                            {(auth) ? <a href="/dashboard" class="btn btn-primary me-1 rounded-4 opacity-75 px-3 fw-semibold">Dashboard</a> :
                                <button data-bs-toggle="modal" data-bs-target="#authModel" class="btn btn-primary me-1 rounded-4 opacity-75 px-3 fw-semibold">Dashboard</button>}
                            <a href="/people" class="btn btn-primary rounded-4 opacity-75 px-3 fw-semibold"><i class="my-1 pe-1 bi bi-arrow-left" />People</a>

                        </div>

                    </div>
                </div>
            </div>
            {loading ?
                (
                    <div className="personPage">

                        <div className="border-bottom bg-white">
                            <div className="d-flex ms-2 ms-md-3">
                                <div className="d-flex justify-content-left mx-auto card-content" style={{ width: "1370px" }}>
                                    <div className="p-3 ps-2">

                                        <img class="rounded-5 cropped" src="https://res.cloudinary.com/dt55mivpf/image/upload/v1671421250/MYBLOG/POSTS/y8firp0fwrq4nicvrjw3.jpg" alt="Card image cap" height="150" width="150" />
                                    </div>
                                    
                                    <div className="m-auto ms-2 mt-4 ms-md-4">

                                        <h2 className="fw-semibold text-dark">{name}</h2>
                                        <h4 className="text-muted">({username})</h4>
                                    </div>




                                </div>

                            </div>

                        </div>

                        <div className="d-flex ">
                            <div className="py-4 ps-4 ps-md-4 mx-auto" style={{ width: "1370px" }}>
                                
                                <div class="nav-pills mb-4 list-group list-group-horizontal" id="pills-tab" role="tablist" >
                                    <button class="active list-group-item opacity-75" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Profile</button>
                                    <button class="list-group-item opacity-75" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Friends(20)</button>
                                    <button class="list-group-item opacity-75" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Stories(20)</button>

                                    

                                </div>

                                he first Kannada films to be shot in the US for 30 days, which Kiragandur says was “unheard of in Kannada cinema”. Next year came Masterpiece starring Yash, followed by another Puneeth Rajkumar film, Raajakumara (2017), also Hombale’s first superhit. But it was with KGF: Chapter 1 (2018) that the studio experienced success beyond Karnataka—the Hindi-dubbed version collecting Rs 48 crore. “We always believed language is not a barrier in entertainment and we weren’t going to restrict ourselves to the Kannada-speaking market,” says the duo. Kiragandur and Gowda are acting on their words. Their 2023 slate has six titles, including Salaar, a Prashanth Neel-directed and Prabhas-starrer “event film”, which much like the KGF films will release in Hindi, Tamil, Telugu and Malayalam. There’s also a Tamil film with National Award-winning actress Keerthy Suresh and a Malayalam film with the acclaimed actor Fahadh Faasil. Hombale is looking to venture into Hindi film production too. “We try to finalise the script and director first,” say Kiragandur and Gowda. “Once we have the script ready, we will look for a hero.” The priority, though, will always be to demonstrate that the Kannada industry can make films which resonate nationwide, a feat other South film industries—Tamil, Telugu and Malayalam—have been doing consistently for a while now. “We felt we can take the industry to the next level,” say Kiraga
                                bg-whitehe first Kannada films to be shot in the US for 30 days, which Kiragandur says was “unheard of in Kannada cinema”. Next year came Masterpiece starring Yash, followed by another Puneeth Rajkumar film, Raajakumara (2017), also Hombale’s first superhit. But it was with KGF: Chapter 1 (2018) that the studio experienced success beyond Karnataka—the Hindi-dubbed version collecting Rs 48 crore. “We always believed language is not a barrier in entertainment and we weren’t going to restrict ourselves to the Kannada-speaking market,” says the duo. Kiragandur and Gowda are acting on their words. Their 2023 slate has six titles, including Salaar, a Prashanth Neel-directed and Prabhas-starrer “event film”, which much like the KGF films will release in Hindi, Tamil, Telugu and Malayalam. There’s also a Tamil film with National Award-winning actress Keerthy Suresh and a Malayalam film with the acclaimed actor Fahadh Faasil. Hombale is looking to venture into Hindi film production too. “We try to finalise the script and director first,” say Kiragandur and Gowda. “Once we have the script ready, we will look for a hero.” The priority, though, will always be to demonstrate that the Kannada industry can make films which resonate nationwide, a feat other South film industries—Tamil, Telugu and Malayalam—have been doing consistently for a while now. “We felt we can take the industry to the next level,” say Kiraga
                                bg-whitesticky-topsticky-tophe first Kannada films to be shot in the US for 30 days, which Kiragandur says was “unheard of in Kannada cinema”. Next year came Masterpiece starring Yash, followed by another Puneeth Rajkumar film, Raajakumara (2017), also Hombale’s first superhit. But it was with KGF: Chapter 1 (2018) that the studio experienced success beyond Karnataka—the Hindi-dubbed version collecting Rs 48 crore. “We always believed language is not a barrier in entertainment and we weren’t going to restrict ourselves to the Kannada-speaking market,” says the duo. Kiragandur and Gowda are acting on their words. Their 2023 slate has six titles, including Salaar, a Prashanth Neel-directed and Prabhas-starrer “event film”, which much like the KGF films will release in Hindi, Tamil, Telugu and Malayalam. There’s also a Tamil film with National Award-winning actress Keerthy Suresh and a Malayalam film with the acclaimed actor Fahadh Faasil. Hombale is looking to venture into Hindi film production too. “We try to finalise the script and director first,” say Kiragandur and Gowda. “Once we have the script ready, we will look for a hero.” The priority, though, will always be to demonstrate that the Kannada industry can make films which resonate nationwide, a feat other South film industries—Tamil, Telugu and Malayalam—have been doing consistently for a while now. “We felt we can take the industry to the next level,” say Kiraga
                                bg-whitehe first Kannada films to be shot in the US for 30 days, which Kiragandur says was “unheard of in Kannada cinema”. Next year came Masterpiece starring Yash, followed by another Puneeth Rajkumar film, Raajakumara (2017), also Hombale’s first superhit. But it was with KGF: Chapter 1 (2018) that the studio experienced success beyond Karnataka—the Hindi-dubbed version collecting Rs 48 crore. “We always believed language is not a barrier in entertainment and we weren’t going to restrict ourselves to the Kannada-speaking market,” says the duo. Kiragandur and Gowda are acting on their words. Their 2023 slate has six titles, including Salaar, a Prashanth Neel-directed and Prabhas-starrer “event film”, which much like the KGF films will release in Hindi, Tamil, Telugu and Malayalam. There’s also a Tamil film with National Award-winning actress Keerthy Suresh and a Malayalam film with the acclaimed actor Fahadh Faasil. Hombale is looking to venture into Hindi film production too. “We try to finalise the script and director first,” say Kiragandur and Gowda. “Once we have the script ready, we will look for a hero.” The priority, though, will always be to demonstrate that the Kannada industry can make films which resonate nationwide, a feat other South film industries—Tamil, Telugu and Malayalam—have been doing consistently for a while now. “We felt we can take the industry to the next level,” say Kiraga
                                bg-whitesticky-topsticky-tophe first Kannada films to be shot in the US for 30 days, which Kiragandur says was “unheard of in Kannada cinema”. Next year came Masterpiece starring Yash, followed by another Puneeth Rajkumar film, Raajakumara (2017), also Hombale’s first superhit. But it was with KGF: Chapter 1 (2018) that the studio experienced success beyond Karnataka—the Hindi-dubbed version collecting Rs 48 crore. “We always believed language is not a barrier in entertainment and we weren’t going to restrict ourselves to the Kannada-speaking market,” says the duo. Kiragandur and Gowda are acting on their words. Their 2023 slate has six titles, including Salaar, a Prashanth Neel-directed and Prabhas-starrer “event film”, which much like the KGF films will release in Hindi, Tamil, Telugu and Malayalam. There’s also a Tamil film with National Award-winning actress Keerthy Suresh and a Malayalam film with the acclaimed actor Fahadh Faasil. Hombale is looking to venture into Hindi film production too. “We try to finalise the script and director first,” say Kiragandur and Gowda. “Once we have the script ready, we will look for a hero.” The priority, though, will always be to demonstrate that the Kannada industry can make films which resonate nationwide, a feat other South film industries—Tamil, Telugu and Malayalam—have been doing consistently for a while now. “We felt we can take the industry to the next level,” say Kiraga
                                bg-whitehe first Kannada films to be shot in the US for 30 days, which Kiragandur says was “unheard of in Kannada cinema”. Next year came Masterpiece starring Yash, followed by another Puneeth Rajkumar film, Raajakumara (2017), also Hombale’s first superhit. But it was with KGF: Chapter 1 (2018) that the studio experienced success beyond Karnataka—the Hindi-dubbed version collecting Rs 48 crore. “We always believed language is not a barrier in entertainment and we weren’t going to restrict ourselves to the Kannada-speaking market,” says the duo. Kiragandur and Gowda are acting on their words. Their 2023 slate has six titles, including Salaar, a Prashanth Neel-directed and Prabhas-starrer “event film”, which much like the KGF films will release in Hindi, Tamil, Telugu and Malayalam. There’s also a Tamil film with National Award-winning actress Keerthy Suresh and a Malayalam film with the acclaimed actor Fahadh Faasil. Hombale is looking to venture into Hindi film production too. “We try to finalise the script and director first,” say Kiragandur and Gowda. “Once we have the script ready, we will look for a hero.” The priority, though, will always be to demonstrate that the Kannada industry can make films which resonate nationwide, a feat other South film industries—Tamil, Telugu and Malayalam—have been doing consistently for a while now. “We felt we can take the industry to the next level,” say Kiraga
                                bg-whitesticky-topsticky-tophe first Kannada films to be shot in the US for 30 days, which Kiragandur says was “unheard of in Kannada cinema”. Next year came Masterpiece starring Yash, followed by another Puneeth Rajkumar film, Raajakumara (2017), also Hombale’s first superhit. But it was with KGF: Chapter 1 (2018) that the studio experienced success beyond Karnataka—the Hindi-dubbed version collecting Rs 48 crore. “We always believed language is not a barrier in entertainment and we weren’t going to restrict ourselves to the Kannada-speaking market,” says the duo. Kiragandur and Gowda are acting on their words. Their 2023 slate has six titles, including Salaar, a Prashanth Neel-directed and Prabhas-starrer “event film”, which much like the KGF films will release in Hindi, Tamil, Telugu and Malayalam. There’s also a Tamil film with National Award-winning actress Keerthy Suresh and a Malayalam film with the acclaimed actor Fahadh Faasil. Hombale is looking to venture into Hindi film production too. “We try to finalise the script and director first,” say Kiragandur and Gowda. “Once we have the script ready, we will look for a hero.” The priority, though, will always be to demonstrate that the Kannada industry can make films which resonate nationwide, a feat other South film industries—Tamil, Telugu and Malayalam—have been doing consistently for a while now. “We felt we can take the industry to the next level,” say Kiraga
                                bg-whitehe first Kannada films to be shot in the US for 30 days, which Kiragandur says was “unheard of in Kannada cinema”. Next year came Masterpiece starring Yash, followed by another Puneeth Rajkumar film, Raajakumara (2017), also Hombale’s first superhit. But it was with KGF: Chapter 1 (2018) that the studio experienced success beyond Karnataka—the Hindi-dubbed version collecting Rs 48 crore. “We always believed language is not a barrier in entertainment and we weren’t going to restrict ourselves to the Kannada-speaking market,” says the duo. Kiragandur and Gowda are acting on their words. Their 2023 slate has six titles, including Salaar, a Prashanth Neel-directed and Prabhas-starrer “event film”, which much like the KGF films will release in Hindi, Tamil, Telugu and Malayalam. There’s also a Tamil film with National Award-winning actress Keerthy Suresh and a Malayalam film with the acclaimed actor Fahadh Faasil. Hombale is looking to venture into Hindi film production too. “We try to finalise the script and director first,” say Kiragandur and Gowda. “Once we have the script ready, we will look for a hero.” The priority, though, will always be to demonstrate that the Kannada industry can make films which resonate nationwide, a feat other South film industries—Tamil, Telugu and Malayalam—have been doing consistently for a while now. “We felt we can take the industry to the next level,” say Kiraga
                                bg-whitesticky-topsticky-top
                            </div>
                        </div>
                    </div>

                ) : <Preloader />}

        </div>
    );
}


export default Person;