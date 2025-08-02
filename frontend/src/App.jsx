import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import PrivateRoutes from './utils/PrivateRoutes.jsx'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks.jsx'
import Home from './pages/Home.jsx'

export const router =
  createBrowserRouter(
    createRoutesFromElements(
      <>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<PrivateRoutes>
          <Dashboard/>
        </PrivateRoutes>} />
        <Route path="/tasks" element={<PrivateRoutes>
          <Tasks/>
        </PrivateRoutes>} />
       

      </>
    )
  )




