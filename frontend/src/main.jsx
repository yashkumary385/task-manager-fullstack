import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import  { router } from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer , Bounce } from 'react-toastify'


createRoot(document.getElementById('root')).render(

    <AuthProvider>
    <RouterProvider router = {router} />
            <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
    </AuthProvider>
  
)
