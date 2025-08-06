import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import Header from '../components/Header';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
const Tasks = () => {
    const { user, token } = useAuth();
    const navigate = useNavigate();
    const [editTask, setEditTask] = useState(null)
    const [showModal, setShowModal] = useState(false);
    const [tasks, setTasks] = useState([])
    const [form, setForm] = useState({
        title: "",
        description: "",
        priority: "",
        status: "",
        dueDate: "",
        assigned_to: "",
        created_by: user?._id,
        attachments: []
    })
    const[users , setUsers] = useState([])

    useEffect(()=>{
        const getNonAdmin = async()=>{
        try {
            
            const res = await api.get("/getAll",{
                headers: {
                        Authorization: `Bearer ${token}`
                    }
            })
            setUsers(res.data.users)
            console.log(res.data.users)
            // console.log(res);
        } catch (error) {
            console.log(error)
        }
        }
        getNonAdmin()
    },[])

const handleChange = (e) => {
    if (e.target.name === "attachments") {
        setForm((prev) => ({
            ...prev,
            attachments: e.target.files // FileList
        }));
    } else {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }
};



    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("description", form.description);
        formData.append("priority", form.priority);
        formData.append("dueDate", form.dueDate);

        for (let i = 0; i < form.attachments.length; i++) {
            formData.append("attachments", form.attachments[i]);
        }
        try {

            if (editTask) {
                const res = await api.put(`/api/tasks/${editTask}`, {
                    title: form.title,
                    description: form.description,
                    priority: form.priority,
                    dueDate: form.dueDate
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setTasks((prev) =>
                    prev.map((task) => (task._id === editTask ? res.data.task : task))
                );
                console.log(res);

                toast.success("Task updated successfully!");
                setShowModal(false);
                fetchTask()



            }
            else {
                const res = await api.post("/api/tasks", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`
                    }
                })
                setTasks((prev) => ([...prev, res.data.task]))
            }
            setForm({
                title: "",
                description: "",
                priority: "",
                status: "",
                dueDate: "",
                attachments: []
            });
            setEditTask(null)
            fetchTask()
            toast.success("task created succesfully")


            // console.log(res);
        } catch (error) {
            console.log(error)
            if (error.response?.data.message) {
                toast.error(error.response.data.message)
            }
            else {
                toast.error("Couldn't Create Service")
            }

        }
    }

    const fetchTask = async () => {
        try {
            const res = await api.get("/api/tasks", {
                headers: { Authorization: `Bearer ${token}` }
            })
            console.log(res)
            setTasks(res.data)
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {

        fetchTask()


    }, [])

    const handleEdit = (task) => {
        // console.log(id);
        setForm({
            title: task.title,
            description: task.description,
            priority: task.priority,
            dueDate: task.dueDate,
            attachments: [], // or prefill if you support showing uploaded files
        });
        setEditTask(task._id);
        setShowModal(true);
    }


    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleDelete = async (id) => {
        let confirm = window.confirm(" Are you sure you want to delete task")
        if (confirm) {
            const res = await api.delete(`/api/tasks/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })

            fetchTask()
            //    console.log(res)
        }

    }
    const handleStatus = async (id, newStatus) => {
        try {
            console.log(id)
            await api.patch(`/api/tasks/${id}/status`,
                { status: newStatus },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,



                    }
                })
            toast.success("status changed")
            fetchTask()
        }
        catch (err) {
            console.log(err)

        }
    }

    return (
        <>
            <Header />
            <div className="min-h-screen  px-4 py-6 flex flex-col items-center bg-[#4CAF50]">
                {user?.role === "admin" && (
                    <>
                        <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow">

                            <h2 className="text-2xl font-bold mb-4">Create Tasks</h2>
                            <form className='flex flex-col gap-4 justify-center items-center w-full' onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-green-500 rounded-md shadow-sm"
                                    placeholder="Enter Title"
                                    value={form.title}
                                    name="title"
                                    onChange={handleChange}
                                />

                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-green-500 rounded-md shadow-sm"
                                    placeholder="Enter Description"
                                    value={form.description}
                                    name="description"
                                    onChange={handleChange}
                                />

                                <select
                                    name="priority"
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-green-500 rounded-md shadow-sm bg-white text-gray-700"
                                >
                                    <option value="">Select Priority</option>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>

                                <input
                                    type="date"
                                    className="w-full px-4 py-2 border border-green-500 rounded-md shadow-sm text-gray-700"
                                    value={form.dueDate}
                                    name="dueDate"
                                    onChange={handleChange}
                                />
                                  <select
                                    name="assigned_to"
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-green-500 rounded-md shadow-sm bg-white text-gray-700"
                                >
                                   { users.map((user)=>(
                                    <option key={user._id} value={user._id}>{user.fullName}</option>
                                   ))
}
                                </select>
                           

                                <input
                                    type="file"
                                    name="attachments"
                                    multiple
                                    className="w-full px-4 py-2 border border-green-500 rounded-md shadow-sm  bg-white text-gray-600  hover:file:bg-green-100"
                                    onChange={handleChange}
                                />
                                <Button variant="success" type="submit">Create</Button>
                            </form>
                        </div>
                    </>
                )

                }
                <div className='w-1/2'>
                    <h1 className='text-3xl font-bold mb-6 text-white'>Your Tasks</h1>
                    {tasks.map((task) => 
                    (
                        <Card key={task._id} className="mb-4 shadow-md">
                            
                            <Card.Header className="font-semibold capitalize"> Priority : {task?.priority} priority</Card.Header>
                            <Card.Body>
                                <Card.Title className="text-xl font-bold"> Title : {task?.title}</Card.Title>
                                <Card.Text className="text-gray-700">
                                    Description:  {task?.description}
                                </Card.Text>
                                <Card.Text className="text-sm text-muted">
                                    Status: <strong>{task?.status}</strong>
                                </Card.Text>
                                
                                {task.attachments && task.attachments.length > 0 && (
  <div className="mt-2">
    <p className="text-sm text-muted font-semibold">Attachments:</p>
    <ul className="list-disc pl-4">
      {task.attachments.map((file, index) => (
        <li key={index}>
       <a href={`https://task-manager-backend-zz8q.onrender.com/${file}`} download>
  {file}
</a>

        </li>
      ))}
    </ul>
  </div>
)}


                                {user?.role === "admin" ? (
                                    <>
                                        <div className='flex gap-2'>
                                            <Button variant="primary" onClick={() => handleEdit(task)}>Edit</Button>
                                            <Button variant="danger" onClick={() => handleDelete(task._id)}>Delete</Button>
                                        </div>
                                    </>
                                ) :
                                    <select
                                        value={task.status}
                                        onChange={(e) => handleStatus(task._id, e.target.value)}
                                        className="mt-2 px-3 py-1 border rounded"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="in-progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </select>



                                }
                            </Card.Body>
                        </Card>
                    ))}
                </div>





            </div>
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                        <input
                            type="text"
                            name="title"
                            className="form-control"
                            placeholder="Title"
                            value={form.title}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="description"
                            className="form-control"
                            placeholder="Description"
                            value={form.description}
                            onChange={handleChange}
                        />
                        <select
                            name="priority"
                            className="form-select"
                            value={form.priority}
                            onChange={handleChange}
                        >
                            <option value="">Select Priority</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                        <input
                            type="date"
                            name="dueDate"
                            className="form-control"
                            value={form.dueDate}
                            onChange={handleChange}
                        />
                        <input
                            type="file"
                            name="attachments"
                            className="form-control"
                            multiple
                            onChange={handleChange}
                        />
                        <div className="d-flex justify-content-end gap-2 mt-3">
                            <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
                            <Button variant="primary" type="submit">Update</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

        </>
    )
}

export default Tasks
