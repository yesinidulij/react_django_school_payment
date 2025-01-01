import React, { useState, useEffect } from "react";
import { data } from "react-router-dom";
import api from "../api";
import Table from 'react-bootstrap/Table';
import UserNavbar from "./UserNavbar";
import "../styles/css/Payment.css"

function Payment() {
  const [payments, setPayments] = useState([]);
  const [user, setUser] = useState({});

  const fetchPayments = async () => {
    const result = await api.get('api/payments/');
    setPayments(result.data);
  };

  const fetchUsers = async () => {
    const result = await api.get('api/current-user/');
    setUser(result.data);
  };

  useEffect(() => {
    fetchPayments();
    fetchUsers();
  }, []);

  return (
    <>
      <UserNavbar />
      <h1>Recent Payments of {user.username}</h1>
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
              <td>{user.first_name} {user.last_name}</td>
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

export default Payment;