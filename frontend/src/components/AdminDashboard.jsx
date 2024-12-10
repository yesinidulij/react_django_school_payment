import React, { useEffect, useState } from 'react';
import api from '../api';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [studentCount, setStudentCount] = useState(0); // New state for count

  const fetchStudents = async () => {
    const result = await api.get('api/students/');
    console.log(result.data);
    setStudents(result.data);
    console.log(students.length);
    setStudentCount(students.length); 
  }

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
<div>
<Navbar/>
<br />
<br />

    <Card style={{ width: '18rem', marginLeft:'100px' }}>
      <Card.Body>
        <Card.Title>Students</Card.Title>
        <Card.Text>
          {studentCount}
        </Card.Text>
        <Link   to="students/">view</Link>
      </Card.Body>
    </Card>
</div>
  );
}

export default AdminDashboard;