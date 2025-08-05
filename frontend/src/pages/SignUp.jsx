import React, { useState } from 'react'
import { CircleUser, Key, Mail, User, UserRoundPen, UserStar ,Eye} from 'lucide-react';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import api from "../api.js"
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        userName: "",
        password: "",
        role: ""
    })
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const handleChange = (e) => {
        setForm((prev) => (
            {
                ...prev,
                [e.target.name]: e.target.value
            }
        ))

    }
      const validate = () => {
            if (!form.email) {
                toast.error("email is required")
                return false;
            }
            if (!form.email.includes("@")) {
                toast.error("invalid email")
                return false;
            }
            if (!form.password) {
                toast.error("Password is required")
                return false;
    
            }
            if(!form.userName){
                toast.error("Username is required")
            }
            if(!form.fullName){
                toast.error("Fullname is required")
            }
           
            return true;
    
        }

        const setVisibility = ()=>{
            setPasswordVisibility(!passwordVisibility)
        }
     const handleSignup = async (e) => {
        e.preventDefault();
        if(!validate()) return ;
        // if(!form.name || !form.email ){
        //   toast.warning("Name and Password are required")
        //   return 
        // }
        console.log(form)
        try {
            const res = await api.post("/api/auth/register", {
                fullName: form.fullName,
                email: form.email,
                password: form.password,
                userName:form.userName,
                role:form.role

            })

            console.log(res)
            setTimeout(() => {
                navigate("/login")
            }, 1500)
            toast.success("SignUp Successfull")
        } catch (error) {
            console.log(error)
            if(error.response?.data.message){
                toast.error(error.response.data.message)
            }
            else{
                toast.error("Sign up failed")

            }

        }

    }
    return (
        <div className='min-h-screen bg-[#4CAF50] flex items-center justify-center'>
            <div className='w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] bg-[#F9FAFB] flex flex-col gap-3 items-center justify-center p-6 rounded-lg'>
                <div className="text-2xl font-bold text-center">SignUp</div>

                <div className="flex justify-center items-center">
                    <User className="w-6 h-6 text-gray-600" />
                </div>


                <form className='flex flex-col gap-3 jutify-center items-center w-full' onSubmit={handleSignup}>
                    <div className="w-full relative">
                        <div><CircleUser className="absolute top-2 left-2 w-6 h-6" /></div>
                        <input type="text"
                            className="border-2 border-[#4CAF50] pl-12 pr-10 py-2 w-full rounded hover:bg-gray-100"
                            value={form.fullName}
                            name="fullName"
                            onChange={(e)=>handleChange(e)}
                            placeholder='Enter FullName'
                        />
                    </div>
                    <div className="w-full relative">
                        <div><UserRoundPen className="absolute top-2 left-2 w-6 h-6" /></div>
                        <input type="text"
                            className="border-2 border-[#4CAF50] pl-12 pr-10 py-2 w-full rounded hover:bg-gray-100"
                            value={form.userName}
                            name="userName"

                            onChange={(e)=>handleChange(e)}
                            placeholder='Enter UserName'
                        />
                    </div>
                    <div className="w-full relative">
                        <div><Mail className="absolute top-2 left-2 w-6 h-6" /></div>
                        <input type="email"
                            className="border-2 border-[#4CAF50] pl-12 pr-10 py-2 w-full rounded hover:bg-gray-100"
                            value={form.email}
                            name="email"

                            onChange={handleChange}
                            placeholder='Enter Email'
                        />
                    </div>
                    <div className="w-full relative">
                        <div><Key className="absolute top-2 left-2 w-6 h-6" /></div>
                        <input type={passwordVisibility ? "text" : "password"}
                            className="border-2 border-[#4CAF50] pl-12 pr-10 py-2 w-full rounded hover:bg-gray-100"
                            value={form.password}
                            name="password"

                            onChange={handleChange}
                            placeholder='Enter password'
                        />
                                <div className="absolute top-2 right-2" onClick={setVisibility}><Eye /></div>

                    </div>
                    <div className="w-full relative">
                        <div><UserStar className="absolute top-2 left-2 w-6 h-6" /></div>
                        <select name="role" onChange={handleChange} className='border-2 border-[#4CAF50] pl-12 pr-10 py-2 w-full rounded hover:bg-gray-100'>
                            <option value="">Select Role</option>
                            <option value="admin">admin</option>
                            <option value="user">user</option>
                        </select>
                    </div>



                    <Button type="submit" variant="outline-success" className="w-100" >
                            SignUp
                    </Button>

                </form >
  <div>
                    <p>If you are already Signed Up....</p>
                <Link to="/login">
                <Button type="submit" variant="outline-success" className="w-100">
                        Login
                    </Button>
                    </Link>
                    </div>



            </div>

        </div>
    )
}

export default SignUp
