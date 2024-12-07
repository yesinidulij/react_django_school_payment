import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/css/style.css"
import "../styles/lib/animate/animate.min.css" 
import "../styles/lib/owlcarousel/assets/owl.carousel.min.css"
import "../styles/css/bootstrap.min.css"
import { Link } from "react-router-dom";
function RegisterForm({ route, method }) {
    const [username, setUsername] = useState("");
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "SignUp";

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post(route, {username,password})
            var user="<User:"+username+">"
            res = await api.post("/api/systemuser/register/", {first_name,last_name,mobile,email,gender})
            alert("sign up successful")
                navigate("/login")
            }
        catch (error) {
            alert(error)
        } 
       
    };

    return (
        <div className="container-xxl py-5">
        <div className="container">
            <div className="bg-light rounded">
                <div className="row g-0">
                    <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                        <div className="h-100 d-flex flex-column justify-content-center p-5">
                            <h1 className="mb-4">{name}</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="row g-3">
                                <div className="col-sm-6">
                                        <div className="form-floating">
                                            <input onChange={(e)=>{
                                                setUsername(e.target.value)
                                            }} type="text" className="form-control border-0" id="username" placeholder="username" value={username}/>
                                            <label htmlFor="username">username</label>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-floating">
                                            <input onChange={(e)=>{
                                                setFirst_name(e.target.value)
                                            }} type="text" className="form-control border-0" id="first_name" placeholder="first_name" value={first_name}/>
                                            <label htmlFor="first_name">first name</label>
                                        </div>
                                    </div>

                                    <div className="col-sm-6">
                                        <div className="form-floating">
                                            <input onChange={(e)=>{
                                                setLast_name(e.target.value)
                                            }} type="text" className="form-control border-0" id="last_name" placeholder="last_name" value={last_name}/>
                                            <label htmlFor="last_name">last name</label>
                                        </div>
                                    </div>

                                    <div className="col-sm-6">
                                        <div className="form-floating">
                                            <input onChange={(e)=>{
                                                setMobile(e.target.value)
                                            }} type="text" className="form-control border-0" id="phone" placeholder="phone" value={mobile}/>
                                            <label htmlFor="phone">phone</label>
                                        </div>
                                    </div>

                                    <div className="col-sm-6">
                                        <div className="form-floating">
                                            <input onChange={(e)=>{
                                                setEmail(e.target.value)
                                            }} type="text" className="form-control border-0" id="email" placeholder="email" value={email}/>
                                            <label htmlFor="email">Email</label>
                                        </div>
                                    </div>

                                    <div className="col-sm-6">
                                        <div className="form-floating">
                                            <input onChange={(e)=>{
                                                setGender(e.target.value)
                                            }} type="text" className="form-control border-0" id="gender" placeholder="gender" value={gender}/>
                                            <label htmlFor="gender">gender</label>
                                        </div>
                                    </div>

                                   

                                    <div className="col-sm-6">
                                        <div className="form-floating">
                                            <input onChange={(e)=>{
                                                setPassword(e.target.value)
                                            }} type="password" className="form-control border-0" id="password" placeholder="password" value={password}/>
                                            <label htmlFor="password">password</label>
                                        </div>
                                    </div>
                                   <br />
                                   <br />
                                  
                                    <div className="col-6">
                                    <button className="btn btn-primary w-100 py-3" type="submit">{name}</button>
                                    Already have an account? <Link to="/login" >signin</Link>

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
              
                </div>
            </div>
        </div>
    </div>
    );
}

export default RegisterForm