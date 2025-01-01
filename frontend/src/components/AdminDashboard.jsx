import React, { useEffect, useState } from 'react';
import api from '../api';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [studentCount, setStudentCount] = useState(0); // New state for count
  const [fees, setFee] = useState([]);
  const [payments, setPayments] = useState([]);
  const [paid, setPaid] = useState([]);
  const [notPaid, setNotPaid] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const fetchFee = async () => {
    const result = await api.get("api/fees/");
    setFee(result.data);
  };

  const fetchStudents = async () => {
    const result = await api.get('api/users/');
    console.log(result.data);
    setStudents(result.data);
    console.log(students.length);
    setStudentCount(students.length);
  }

  useEffect(() => {
    fetchStudents();
    fetchFee();
  }, []);

  return (
    <div>
      <AdminNavbar />
      <br />
      <br />

      <Row>
        {/* Display fee information as cards horizontally */}
        {fees.map((fee) => (
          <Col key={fee.id} xs={12} md={6} lg={4}> 
            <Card style={{ marginBottom: '10px' }}>
              <Card.Body>
                <Card.Title>Fee Information</Card.Title>
                <Card.Text>
                  {/* Display fee details here */}
                  <p>Fee Name: {fee.name}</p>
                  <p>Amount: {fee.amount}</p>
                  <p>Due Date: {fee.due_date}</p>
                  {/* Add more fee details as needed */}
                </Card.Text>
                <Link className="btn btn-primary mr-2" to={`/${fee.id}`}>Full Detail</Link>
                </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

    </div>
  );
}

export default AdminDashboard;