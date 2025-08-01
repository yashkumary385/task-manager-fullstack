import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios"
import { toast } from "react-toastify";
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext)
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem("token") || null); // get the token from the storage if not there then empty string
    const [loading, setLoading] = useState(true)

    const login = async (email, password) => {
        try {
            const res = await axios.post("http://127.0.0.1:8000/api/auth/login", {
                email,
                password
            })
            console.log(res);
            const { token, user } = res.data

            setToken(token);
            localStorage.setItem("token",token)
            setUser(user)
            console.log(user)
            return { success: true }
        } catch (error) {
            console.log(error)
            // toast.error("problem occured")
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Something went wrong");
            }
            return {
                success: false,
                error: error.res?.data?.message || "Login failed",
            };
        }
    }

    const logout = () => {
        localStorage.removeItem("token")
        setToken(null)
        setUser(null)

    }

    // automatically fetch user if token is there

    useEffect(() => {
        const fetchUser = async () => {
            try {
                 if(!token){
        setUser(null)
        console.log("no token")
        return
    }
                const res = await axios.get("http://localhost:8000/current-user", {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setUser(res.data.user)
            } catch (error) {
                console.log(error)
                logout();
            } finally {
                setLoading(false)
            }
        }
        fetchUser()
    }, [token])

    return (
        <AuthContext.Provider value={{ login, logout, user, setUser, token }}>
            {children}
        </AuthContext.Provider>
    )

}