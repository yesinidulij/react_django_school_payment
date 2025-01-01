import React from 'react'
import { useParams } from 'react-router-dom'
function PaymentSuccees() {
const {tx_ref} = useParams();

  return (
    
    <div>PaymentSuccees</div>
  )
}

export default PaymentSuccees