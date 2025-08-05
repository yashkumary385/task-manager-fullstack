import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Button from 'react-bootstrap/Button';
import { Lock, Mail } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault();
          if(!validate()) return;
        const result = await login(email, password)
        console.log(result); // this result is success that we add 
        if (result.success) {
            navigate("/dashboard")
        }
        else {
            console.log("error")
        }


    }
    const validate = () => {
        if (!email) {
            toast.error("email is required")
            return false;
        }
        if (!email.includes("@")) {
            toast.error("invalid email")
            return false;
        }
        if (!password) {
            toast.error("Password is required")
            return false;

        }
        return true;

    }

    return (
        <div
            className="flex justify-center items-center min-h-screen px-4"
            style={{ backgroundColor: "#4CAF50" }}
        >
            <div
                className="w-full max-w-[350px] sm:max-w-[400px] md:max-w-[500px] p-6 rounded-lg  bg-[#F9FAFB] flex flex-col items-center gap-6"
            >
                <div className="text-2xl font-bold text-center">Login</div>


                <div className="flex justify-center items-center">
                    <Lock className="w-6 h-6 text-gray-600" />
                </div>

                <form
                    className="flex flex-col gap-3 w-full"
                    onSubmit={handleLogin}
                >
                    <div className="relative w-full">
                        <div>
                            <Mail className="absolute top-2 left-2 w-6 h-6" />
                        </div>
                        <input
                            type="email"
                            className="border-2 border-[#4CAF50] pl-12 pr-10 py-2 w-full rounded hover:bg-gray-100"
                            value={email}
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="relative w-full">
                        <div>
                            <Lock className="absolute top-2 left-2 w-6 h-6" />
                        </div>
                        <input
                            type="password"
                            className="border-2 border-[#4CAF50] pl-12 pr-10 py-2 w-full rounded hover:bg-gray-100"
                            value={password}
                            placeholder="Enter password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <Button type="submit" variant="outline-success" className="w-100">
                        Login
                    </Button>
                </form>
                <div>
                    <p>If you havent Signed Up....</p>
                <Link to="/signup">
                <Button type="submit" variant="outline-success" className="w-100">
                        Signup
                    </Button>
                    </Link>
                    </div>



            </div>
        </div>

    )
}

export default Login
