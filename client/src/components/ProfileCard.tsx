import { useRecoilValue } from "recoil";
import { authState } from "../state/authState";
import { ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";




export const ProfileCard = () => {
    const auth = useRecoilValue(authState)
    const navigate = useNavigate()

    if(!auth.token) {
      return <div> Please log in to view your Profile </div>
    }
    const handleLogout = async (e: FormEvent ) => {
      e.preventDefault()
      try {
        const token = sessionStorage.getItem('token')
        await axios.get(`${BACKEND_URL}/user/logout`,{
          headers:{
            Authorization:token
          }
        })
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('user')
        navigate('/login')
      } catch (err) {
        console.error("Logout error:", err); 
      }
    }
    
    return(
      <div className="flex flex-col justify-center items-center h-screen">
        <div className=" p-8 rounded-lg shadow-md shadow-slate-200 hover:shadow-xl hover:shadow-slate-500">
        <h1 className="font-extrabold text-center mb-2 shadow-sm ">Profile Card</h1>
                <h1 className="font-extrabold">name: {auth.name}</h1>
                <p className="font-bold">Email: {auth.email}</p>
                <p className="font-bold">User ID: {auth.id}</p>
                <div className="flex justify-evenly w-full">

          <button className="bg-sky-400 p-2 text-white font-bold text-center mt-4 rounded-lg hover:bg-sky-600">Update</button>
          <button onClick={handleLogout} className="bg-primary p-2 text-white font-bold text-center mt-4 rounded-lg hover:bg-red-600">Logout</button>
                </div>
        </div>
      </div>  
    )
    };
