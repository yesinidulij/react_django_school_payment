import { useState,useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/css/style.css"
import "../styles/lib/animate/animate.min.css" 
import "../styles/lib/owlcarousel/assets/owl.carousel.min.css"
import "../styles/css/bootstrap.min.css"
function Form({ route, method }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [users,setUsers]=useState([])
    const fetchUsers = async () => {
        const result = await api.get('api/users/');
        setUsers(result.data);
      };
    
      useEffect(() => {
        fetchUsers();
      }, []);
     
    
    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        try {
            const res = await api.post(route, { email, password })
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                const user = users.find(user => user.email.toLowerCase() == email.toLowerCase()); 
                if (!user) {
                    // Handle the case where the user is not found (e.g., display an error message)
                    alert("User not found.");
                    return; 
                }
                console.log(user.email)
            if (user.email == "admin@gmail.com") {
                navigate("/admin"); // Redirect to staff dashboard
            }
            else{
                navigate("/user")
            }
            } else {
                navigate("/login")
            }
        } catch (error) {
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
                                                setEmail(e.target.value)
                                            }} type="email" className="form-control border-0" id="email" placeholder="email" value={email}/>
                                            <label htmlFor="email">email</label>
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
export default Form