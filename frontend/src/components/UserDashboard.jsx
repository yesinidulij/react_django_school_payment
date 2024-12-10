import React from 'react'
import { useState,useEffect } from 'react';
import api from '../api';
function UserDashboard() {
    const [user, setUser] = useState([]);

    const fetchStudents = async () => {
      const result = await api.get('api/user/');
      console.log(result.data);
      setUser(result.data);
    
    }
  
    useEffect(() => {
      fetchStudents();
    }, []);
  return (
    <div>UserDashboard</div>
  )
}

export default UserDashboard