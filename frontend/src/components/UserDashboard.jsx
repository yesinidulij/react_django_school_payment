import React, { useState, useEffect } from 'react';
import api from '../api';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserNavbar from './UserNavbar';
import Pay from './Pay'
function UserDashboard() {
  const [fees, setFees] = useState([]);
  const [payments, setPayments] = useState([]);
  const [user, setUser] = useState({});
  const [fname, setFname] = useState({});
  const [lname, setLname] = useState({});
  const [email, setEmail] = useState({});
  const [amount, setAmount] = useState({});

const randomnum=Math.floor(Math.random()
* (1000000 - 1000 + 1)) + 1000;

  const fetchUsers = async () => {
    const result = await api.get('api/current-user/');
    setUser(result.data);
  };

  const fetchFee = async () => {
    const result = await api.get('api/fees/');
    setFees(result.data);
  };

  const fetchPaidStudent = async (feeid) => {
    const response = await api.get(`api/paid_student?feeid=${feeid}`);
    return response.data;
  };

  useEffect(() => {
    fetchUsers();
    fetchFee();
  }, []);

  useEffect(() => {
    const fetchPayments = async () => {
      const allPayments = await Promise.all(
        fees.map(async (fee) => {
          const paidStudents = await fetchPaidStudent(fee.id);
          return { feeId: fee.id, students: paidStudents };
        })
      );
      setPayments(allPayments);
    };

    if (fees.length > 0) {
      fetchPayments();
    }
  }, [fees]);

 
  

  return (
    <div>
      <UserNavbar/>
      <br />
      <br />
    <>
    
    <Row>
      {fees.map((fee) => {
        const paymentData = payments.find((payment) => payment.feeId === fee.id);
        const isPaid = paymentData && paymentData.students.length >= 1;

        return (
          <Col key={fee.id} xs={12} md={6} lg={4}>
            <Card
              style={{
                marginBottom: '10px',
                marginLeft:'20px',
                cursor: isPaid ? 'not-allowed' : 'pointer', 
                backgroundColor: isPaid ? '#f0f0f0' : '#ffffff', // Gray if paid
              }}
            >
              <Card.Body>
                <Card.Title>{fee.name}</Card.Title>
                <Card.Text>
                  <p>Amount: ${fee.amount}</p>
                  <p>Due Date: {fee.due_date}</p>
                </Card.Text>
                {isPaid ? (
                  <div>
                    <p>Paid</p>
                  </div>
                ) : (
                  <div>
                   <Pay 
                   fname={user.first_name}
                   lname={user.last_name}
                   email={user.email}
                   amount={fee.amount}
                   title={fee.id}
                   description={fee.description}
                   public_key="CHAPUBK_TEST-scHmP8tNLVo7LkOGEd3XQIxmVizGy4mo"
                   tx_ref={user.first_name+"-tx-"+randomnum}
                   
                   />
                    <Button variant="secondary" onClick={() => handleViewDetails(fee.id)}>
                      View Details
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
    </>
    </div>
  );
}

export default UserDashboard;
