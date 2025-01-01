import React from 'react'
import Table from 'react-bootstrap/Table';
import { useState,useEffect } from 'react';
import api from '../api';
import Navbar from './Navbar';
import AdminNavbar from './AdminNavbar';
function StudentList() {
    const [students, setStudents] = useState([]);
  const [studentCount, setStudentCount] = useState(0); // New state for count

  const fetchStudents = async () => {
    const result = await api.get('api/users/');
    setStudents(result.data);
  }

  useEffect(() => {
    fetchStudents();
  }, []);
    return (
       <div>
        <AdminNavbar/>
        <br />
        <br />
         <Table striped bordered hover>
          <thead>
            <tr>
              <th>STUDENT ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone Number</th>

            </tr>
          </thead>
          {
          students.map((student, index) => (

          <tbody>
            <tr>
              <td>{student.id}</td>
              <td>{student.first_name}</td>
              <td>{student.last_name}</td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
            </tr>
          </tbody>
          ))}
        </Table>
       </div>
      );
}

export default StudentList