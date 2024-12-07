import React ,{useState}from 'react'
import "../styles/css/style.css"
import api from '../api'
import "../styles/lib/animate/animate.min.css" 
import "../styles/lib/owlcarousel/assets/owl.carousel.min.css"
import "../styles/css/bootstrap.min.css"
import Payment from './Payment'
function Pay({fname,lname,email,phone,amount,tx_ref,public_key}) {

  const handleSubmit = (e) => {
    e.preventDefault();
    var customer_name=fname+" "+lname;
    var transation_reference=tx_ref;
    
    api
        .post("/api/payments/", { customer_name,email,phone,amount,transation_reference,public_key })
        .then((res) => {
            if (res.status === 201) alert("payment registered!");
            else alert("Failed to register payment.");
        })
        .catch((err) => alert(err));
};
  return (
    <div><>
     <form method="POST"  action="https://api.chapa.co/v1/hosted/pay"  >
    <input type="hidden" name="public_key" value={public_key} />
    <input type="hidden" name="tx_ref" value={tx_ref} />
    <input type="hidden" name="amount" value={amount} />
    <input type="hidden" name="currency" value="ETB" />
    <input type="hidden" name="email" value={email} />
    <input type="hidden" name="first_name" value={fname} />
    <input type="hidden" name="last_name" value={lname} />
    <input type="hidden" name="title" value="Let us do this" />
    <input type="hidden" name="description" value="Paying with Confidence with cha" />
    <input type="hidden" name="logo" value="https://chapa.link/asset/images/chapa_swirl.svg" />
    <input type="hidden" name="callback_url" value="https://example.com/callbackurl" />
    <input type="hidden" name="return_url" value="http://localhost:5173" />
    <input type="hidden" name="meta[title]" value="test" />
    <button className="btn btn-primary w-100 py-3" type="submit">Pay Now</button>
    </form>
    </></div>
  )
}


export default Pay