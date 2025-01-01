import React,{useState,useEffect} from 'react'
import Pay from '../components/Pay'
import "../styles/css/style.css"
import "../styles/lib/animate/animate.min.css" 
import "../styles/lib/owlcarousel/assets/owl.carousel.min.css"
import "../styles/css/bootstrap.min.css"
import UserNavbar from '../components/UserNavbar'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import api from "../api"
const max=1000000;
const min=1000;
const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
const tx_ref=`kefiyalew-tx-${randomNum}`;
function PaymentForm() {
  

    const [fname,setFname]=useState("");
    const [lname,setLname]=useState("");
    const [email,setEmail]=useState("");
    const [phone,setPhone]=useState("");
    const [amount,setAmount]=useState(50);
    
    const public_key="CHAPUBK_TEST-scHmP8tNLVo7LkOGEd3XQIxmVizGy4mo"
    const [students, setStudents] = useState([]);
    const [studentCount, setStudentCount] = useState(0); // New state for count
  
    const fetchStudents = async () => {
    const result = await api.get('api/students/');
      setStudents(result.data);
    }
  
    useEffect(() => {
      fetchStudents();
    }, []);

      return (
        <div>
            <UserNavbar/>
            <>
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="bg-light rounded">
                        <div className="row g-0">
                            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                <div className="h-100 d-flex flex-column justify-content-center p-5">
                                    <h1 className="mb-4">school fee</h1>
                                    
                                    <form  >
                                        <div className="row g-3">
                                            <div className="col-sm-6">
                                                <div className="form-floating">
                                                    <input onChange={(e)=>{
                                                        setFname(e.target.value)
                                                    }} type="text" className="form-control border-0" id="fname" placeholder="First Name"/>
                                                    <label htmlFor="fname">First Name</label>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-floating">
                                                    <input onChange={(e)=>{
                                                        setLname(e.target.value)
                                                    }} type="text" className="form-control border-0" id="lname" placeholder="Last Name"/>
                                                    <label htmlFor="lname">Last Name</label>
                                                </div>
                                            </div>

                                            <div className="col-sm-12">
                                            <div className="form-floating">
                                            <Dropdown>
      <Dropdown.Toggle variant="light" id="dropdown-basic">
        select for whom you are paying for
      </Dropdown.Toggle>

      <Dropdown.Menu>
      {
          students.map((student, index) => (
        <Dropdown.Item href="#/action-1">{student.student_id} {student.first_name} {student.last_name} {student.email}</Dropdown.Item>

    ))}
      </Dropdown.Menu>
    </Dropdown>

</div>
</div>

                                            <div className="col-sm-6">
                                                <div className="form-floating">
                                                    <input onChange={(e)=>{
                                                        setEmail(e.target.value)
                                                    }}
                                                    type="email" className="form-control border-0" id="email" placeholder="Email"/>
                                                    <label htmlFor="email">Email</label>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-floating">
                                                    <input onChange={(e)=>{
                                                        setPhone(e.target.value)
                                                    }} type="text" className="form-control border-0" id="mobile" placeholder="Phone Number"/>
                                                    <label htmlFor="mobile">Phone Number</label>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-floating">
                                                    <input onChange={(e)=>{
                                                        setAmount(e.target.value)
                                                    }}
                                                    type="number" className="form-control border-0" id="amount" placeholder="Amount"/>
                                                    <label htmlFor="amount">Amount</label>
                                                </div>
                                            </div>
                                          
                                            <div className="col-12">
                                                <Pay 
                                                fname={fname}
                                                lname={lname}
                                                email={email}
                                                phone={phone}
                                                amount={amount}
                                                tx_ref={tx_ref}
                                                public_key={public_key}
    
    
                                                />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s" style={{height: "400px"}}>
                                <div className="position-relative h-100">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </>
    </div>
      )
}

export default PaymentForm