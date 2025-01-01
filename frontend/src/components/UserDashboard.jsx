import React from 'react';
import { useState, useEffect } from 'react';
import api from '../api';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import UserNavbar from './UserNavbar';
import Pay from './Pay';

const UserDashboard = () => {
  const public_key = "CHAPUBK_TEST-scHmP8tNLVo7LkOGEd3XQIxmVizGy4mo";
  const [fees, setFee] = useState([]);
  const [payments, setPayments] = useState([]);
  const [paid, setPaid] = useState([]);
  const [notPaid, setNotPaid] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const fetchFee = async () => {
    const result = await api.get("api/fees/");
    setFee(result.data);
  };

  const fetchPayments = async () => {
    const result = await api.get("api/payments/");
    setPayments(result.data);
  };

  const getPayment = async () => {
    for (const fee of fees) {
      const response = await api.get(`api/payment_detail?feeid=${fee.id}`);
      const paymentValue = response.data.paymentvalue; // Access data from response
      if (paymentValue) {
        setPaid((prevPaid) => [...prevPaid, fee]);
      } else {
        setNotPaid((prevNotPaid) => [...prevNotPaid, fee]);
      }
    }
    setIsLoading(false); // Set loading to false after data is fetched
  };

  useEffect(() => {
    fetchFee();
    fetchPayments();
    getPayment(); // Call getPayment inside useEffect
  }, []);

  const [user, setUser] = useState({});

  const fetchUsers = async () => {
    const result = await api.get('api/current-user/');
    setUser(result.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <UserNavbar />
      <br />
      <br />
      {isLoading ? (
        <p>Loading fees...</p>
      ) : (
        <>
          <h2>Paid Fees:</h2>
          <ul>
            {paid.map((fee, index) => (
              <li key={index}>{fee.name}</li>
            ))}
          </ul>

          <h2>Not Paid Fees:</h2>
          <ul>
            {notPaid.map((fee, index) => (
              <li key={index}>{fee.name || fee.id}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default UserDashboard;