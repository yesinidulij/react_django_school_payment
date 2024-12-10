import react from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import Navbar from "./components/Navbar"
import PaymentForm from "./pages/PaymentForm"
import Payment from "./components/Payment"
import Home from "./pages/Home"
import AdminDashboard from "./components/AdminDashboard"
import StudentList from "./components/StudentList"
import UserDashboard from "./components/UserDashboard"
import Hello from "./components/Hello"
import UserProfile from "./pages/UserProfile"

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route
          path="pay/"
          element={
            <ProtectedRoute>
            <PaymentForm/>
            </ProtectedRoute>
          }
        />
        <Route
          path="hello/"
          element={
            <ProtectedRoute>
            <Hello/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute>
           <UserDashboard/>
            </ProtectedRoute>
          }
        />
        <Route path="login/" element={<Login />} />
        <Route path="" element={<Home />} />

        <Route path="admin/" element={<AdminDashboard />} />
        <Route path="admin/students/" element={<StudentList />} />

        <Route path="logout/" element={<Logout />} />
        <Route path="signup/" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App