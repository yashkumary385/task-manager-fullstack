import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Header from "../components/Header";
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../api.js"
const Dashboard = () => {
  const { user, logout , token } = useAuth();
  const [editUser, setEditUser] = useState(null)
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    userName: "",
    role: ""
  })
  const navigate = useNavigate();

  const navigateTo = () => {
    navigate("/tasks");
  };

  const handleEdit = () => {
    setForm({
      fullName: user?.fullName,
      email: user?.email,
      userName: user?.userName,
      role: user?.role

    })
    setEditUser(user._id)
    setShowModal(true);

  }

 const handleCloseModal = () => {
        setShowModal(false);
    };


    const handleDelete = async()=>{
      try {
        let confirm = window.confirm("Are you sure you want to delete profile you wont be able to recover it ? ")
        if(confirm){
           const res = await api.delete(`/users/${user._id}`,
            {
              headers : {Authorization : `Bearer ${token}`}
            }
           )
      console.log(res)
      toast.success("Profile Deleted")

      navigate('/')
        }
     
        
      } catch (error) {
        console.log(error)
        
      }

    }

     const handleChange = (e) => {
        if (e.target.name === "attachments") {
            setForm((prev) => (
                {
                    ...prev, attachments: e.target.files
                }
            ))
        }
        setForm((prev) => (
            {
                ...prev,
                [e.target.name]: e.target.value
            }
        ))

    }



    const handleSubmit = async(e)=>{
      e.preventDefault();
      try {
        const res = await api.put(`/users/${editUser}`,{
          fullName: form.fullName,
                email: form.email,
                userName:form.userName,
                role:form.role
       },
      {
        headers : { Authorization : `Bearer ${token}`}
      } )
      console.log(res)
      toast.success(" edit successfull ")
      setShowModal(false);
      } catch (error) {
        console.log(error)
        
      }
    }
  return (
    <>
      <Header />

      <div className="min-h-screen bg-[#4CAF50] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[350px] sm:max-w-[400px] md:max-w-[450px]">
          <Card className="text-center shadow-lg">
            <Card.Header className="text-xl font-bold bg-white text-gray-800">
              Welcome, {user?.fullName || user?.userName || "User"}
            </Card.Header>

            <Card.Body className="bg-[#F9FAFB]">
              <Card.Title className="mb-3 text-lg text-gray-700">
                You are logged in as:
              </Card.Title>

              <Card.Text className="mb-2">
                <strong>{user?.email}</strong>
              </Card.Text>

              <Card.Text className="text-sm text-blue-600 mb-4">
                Role: <strong>{user?.role?.toUpperCase() || "USER"}</strong>
              </Card.Text>
<div className="flex gap-3">
              <Button variant="success" onClick={navigateTo}>
                Go to Tasks
              </Button>
              <Button variant="primary" onClick={handleEdit} >
                Edit Profile
              </Button>
              <Button variant="danger" onClick={handleDelete}>
               Delete Profile
              </Button>
              </div>
            </Card.Body>



          </Card>
        </div>
      </div>
           <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                        <input
                            type="text"
                            name="fullName"
                            className="form-control"
                            placeholder="Full Name"
                            value={form.fullName}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="userName"
                            className="form-control"
                            placeholder="User Name"
                            value={form.userName}
                            onChange={handleChange}
                        />
                        <input
                            type="email"
                            name="userName"
                            className="form-control"
                            placeholder="email"
                            value={form.email}
                            onChange={handleChange}
                        />
                        <select
                            name="role"
                            className="form-select"
                            value={form.role}
                            onChange={handleChange}
                        >
                            <option value="">Select Role</option>
                            <option value="admin">admin</option>
                            <option value="user">user</option>
                        </select>
                        <div className="d-flex justify-content-end gap-2 mt-3">
                            <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
                            <Button variant="primary" type="submit">Update</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
    </>
  );
};

export default Dashboard;
