import React from 'react'
import { useState,useEffect } from 'react';
import api from '../api';
function UserProfile() {
    const [user,setUser]=useState([])
    const fetchUsers = async () => {
        const result = await api.get('api/current-user/');
        setUser(result.data);
      }
    
      useEffect(() => {
        fetchUsers();
      }, []);
  return (
    <div>{user.username}</div>
  )
}
export default UserProfile