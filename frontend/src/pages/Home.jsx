import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Header from '../components/Header';

const Home = () => {
  return (
    <>
    <Header/>
        <div
            className="flex justify-center items-center min-h-screen px-4"
            style={{ backgroundColor: "#4CAF50" }}
        >
            <div
                className="w-full max-w-[350px] sm:max-w-[400px] md:max-w-[500px] p-6 rounded-lg  bg-[#F9FAFB] flex flex-col items-center gap-6"
            >
                  <h2 className="mb-3 text-success">Welcome to Task Manager</h2>
        <p className="text-muted mb-4">Please login or register to manage your tasks.</p>
            <Link to="/login">
            <Button variant="success" className="w-100">Login</Button>
          </Link>
          <Link to="/signup">
            <Button variant="outline-success" className="w-100">Register</Button>
          </Link>

                    
            </div>
        </div>
</>
    )
    

};

export default Home;
