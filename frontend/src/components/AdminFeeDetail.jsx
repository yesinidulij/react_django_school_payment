import React from 'react'
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import api from '../api';
function AdminFeeDetail() {
  const { id } = useParams();
  const [payments, setPayments] = useState([]);
  const [users, setUser] = useState({});

  const fetchUsers = async () => {
    const result = await api.get('api/users/');
    setUser(result.data);
  };
  const fetchPaidStudent = async () => {
    const response = await api.get(`api/paid_student?feeid=${id}`);
    setPayments(response.data);
  };
  const matchingUser= (studentid)=>{
    const matchingUser = users.find(user => user.id == studentid);
    const studentName = matchingUser ? `${matchingUser.first_name} ${matchingUser.last_name}` : 'Student Not Found';
   return studentName;
  
  }
  useEffect(() => {
    fetchPaidStudent();
    fetchUsers();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Amount Paid</th>
            <th>Payment Date</th>
            {/* Add more headers as needed for your payment information */}
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td>{matchingUser(payment.student)}</td>
              <td>{payment.amount}</td>
              <td>{payment.payment_date}</td>
              {/* Add more table data cells as needed for your payment information */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminFeeDetail