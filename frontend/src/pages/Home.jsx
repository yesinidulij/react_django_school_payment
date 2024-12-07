import React from 'react'
import "../styles/css/style.css"
import "../styles/lib/animate/animate.min.css" 
import "../styles/lib/owlcarousel/assets/owl.carousel.min.css"
import "../styles/css/bootstrap.min.css"
import Coursel from '../components/Coursel'
import About from '../components/About'
import Footer from '../components/footer'
function Home() {
  return (

    <div>
      <>
     <Coursel/>
     <About/>
     <Footer/>
      </>
    </div>

    )
}

export default Home