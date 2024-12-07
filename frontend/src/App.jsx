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
    <Navbar/>
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
          path="payments/"
          element={
            <ProtectedRoute>
            <Payment/>
            </ProtectedRoute>
          }
        />
        <Route
          path=""
          element={
            <ProtectedRoute>
            <Home/>
            </ProtectedRoute>
          }
        />
        <Route path="login/" element={<Login />} />
        <Route path="logout/" element={<Logout />} />
        <Route path="signup/" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App