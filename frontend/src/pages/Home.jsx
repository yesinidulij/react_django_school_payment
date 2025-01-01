import React from 'react'
import "../styles/css/style.css"
import "../styles/lib/animate/animate.min.css" 
import "../styles/lib/owlcarousel/assets/owl.carousel.min.css"
import "../styles/css/bootstrap.min.css"
import Coursel from '../components/Coursel'
import About from '../components/About'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'
import Faq from '../components/Faq'
import "../styles/css/Faq.css"

function Home() {
  
  return (

    <div>
      <>
      <Navbar/>
     <Coursel/>
     
      </>
      <br />
      <br />
      <br />
      <div><Faq/></div>
    </div>
   
    )
}

export default Home