import React from 'react'
import "../styles/css/style.css"
import "../styles/lib/animate/animate.min.css" 
import "../styles/lib/owlcarousel/assets/owl.carousel.min.css"
import "../styles/css/bootstrap.min.css"
import Coursel from '../components/Coursel'
import About from '../components/About'
import Footer from '../components/footer'
import axios from 'axios';
import { useEffect, useState } from 'react';
import UserNavbar from '../components/UserNavbar'
import Navbar from '../components/Navbar'

function Home() {
  const [currentUser, setCurrentUser] = useState(null);
 
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/users/me/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setCurrentUser(response.data);
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    fetchCurrentUser();
  }, []);

  return (

    <div>
      <>
      <Navbar/>
     <Coursel/>
     
      </>
    </div>

    )
}

export default Home