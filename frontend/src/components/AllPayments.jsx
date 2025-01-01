import React, { useState, useEffect } from "react";
import { data } from "react-router-dom";
import api from "../api";
import Table from 'react-bootstrap/Table';
import UserNavbar from "./UserNavbar";
import "../styles/css/Payment.css"
import AdminNavbar from "./AdminNavbar";

function AllPayments() {
  const [payments, setPayments] = useState([]);

  const fetchPayments = async () => {
    const result = await api.get('api/allpayments/');
    setPayments(result.data);
  };

  const [users, setUser] = useState({});

  const fetchUsers = async () => {
    const result = await api.get('api/users/');
    setUser(result.data);
  };
 

  useEffect(() => {
    fetchPayments();
    fetchUsers();
  }, []);
  const matchingUser= (studentid)=>{
    const matchingUser = users.find(user => user.id == studentid);
    const studentName = matchingUser ? `${matchingUser.first_name} ${matchingUser.last_name}` : 'Student Not Found';
   return studentName;
  
  }
  return (
    <>
      <AdminNavbar />
      <h1>Recent Payments of students</h1>
      <Table striped bordered hover responsive size="sm" className="payment-table">
        <thead>
          <tr>
            <th width="400">Student Name</th>
            <th width="400">Transaction Reference</th>
            <th width="170">Currency</th>
            <th width="170">Amount</th>
            <th width="870">Payment Date</th>
          </tr>
        </thead>
        <tbody>
        
          {payments.map((payment, index) => (
            
            <tr key={index}>
              <td>{matchingUser(payment.student)}</td>
              <td>{payment.reference}</td>
              <td>{payment.currency}</td>
              <td className="amount">{payment.amount}</td> 
              <td>{payment.payment_date}</td>
            </tr>
        ))}
        </tbody>
      </Table>
    </>
  );
}

export default AllPayments;