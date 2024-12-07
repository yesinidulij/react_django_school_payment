import React from 'react'
import "../styles/css/style.css"
import "../styles/lib/animate/animate.min.css" 
import "../styles/lib/owlcarousel/assets/owl.carousel.min.css"
import "../styles/css/bootstrap.min.css"
import "https://code.jquery.com/jquery-3.4.1.min.js"
import "../styles/lib/owlcarousel/owl.carousel.min.js"
import "../styles/lib/easing/easing.min.js"
import "../styles/lib/waypoints/waypoints.min.js"
import "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"
import coursel from "../styles/img/carousel.jpg"
import coursel2 from "../styles/img/carousel2.jpg"
import '../styles/css/Coursel.css'
import quens2 from '../styles/img/file.png'
function Coursel() {
  return (
    <div>
      <div className='hero-container'>
        <img src={quens2} alt="Queens College" /> 
        <div className="text-container"> 
          <h1>Queens College</h1>
          <p>What are you waiting for?</p>
        </div>
      </div>
    </div>
  );
}
export default Coursel