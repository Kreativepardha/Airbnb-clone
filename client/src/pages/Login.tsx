import { Link, useNavigate } from "react-router-dom"
import { InputBox } from "../components/utils/InputBox"
import { ChangeEvent, FormEvent, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"
import {  useSetRecoilState } from "recoil"

import { authState } from "../state/authState"


export const Login = () => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState('')
    const [emailError,setEmailError] = useState(false)
    const [passwordError,setPasswordError] = useState(false)
    // const [user,setUser] = useRecoilState(userState)

    const setAuth = useSetRecoilState(authState)

    const navigate = useNavigate()


  
    const handlePassChange = (e:   ChangeEvent<HTMLInputElement> ) => {
        setPassword(e.target.value)
        setPasswordError(false)
        setError("")

    }
    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>  ) => {
        setEmail(e.target.value)
        setEmailError(false)
        setError("")

    }   

    const handleSubmit = async (e: FormEvent ) => {
        e.preventDefault()
        setError("")
        let isValid = true;
       
            if(email.length < 5){
                setEmailError(true)
                setError("Eamil must atleast be 5 characters long")
                isValid = false
            } 
            if(password.length < 5){
                setPasswordError(true)
                setError("password must atleast be 5 characters long")
                isValid = false
            }
            if(!isValid){
                // setError("Please fill all the details corectly")
                return;
            }

         try {
          const response = await  axios.post(`${BACKEND_URL}/api/v1/user/login`,{
                email,password
            })
          
            if(response.status === 200) {
                const {token , name , email, id } = response.data
                if(token) {
                    sessionStorage.setItem("token",token)
                    // setUser({name, token,email, id })
                    const userData = { id, name, email, token };
                    setAuth(userData)
                    sessionStorage.setItem('user', JSON.stringify(userData));
                    navigate("/dashboard/profile")
                }else {
                    setError("Please try to login again")
                }
                
            } else {
                setError("An error occurred during login. Please try again")
            }


            // ADD CONFIRMATION MODELLLLLLLL

            
        } catch (err:any) {
            if (err.response && err.response.status === 409) {
                setError("Email has already been taken");
            }
            else if (err.response && err.response.status === 401) {
                setError("invalid password");
            }
           else if (err.response && err.response.data.error) {
                console.log(err.response.data.err)
                setError(err.response.data);
            } else {
                console.error(err);
                setError("An error occurred during registration. Please try again.");
            }
         }}

    return <div className="h-screen flex justify-center bg-opacity-15">
            <h1 className="font-bold relative top-10 left-20 text-3xl">Login</h1>
        <form onSubmit={handleSubmit}    className="w-2/4 shadow-md h-80 mt-20 rounded-lg p-6 bg-white hover:shadow-lg ">
        {
            
                error && <p className="text-red-500 text-center pb-2 -mb-4">{error}</p>
            }
            <InputBox 
            name="email"
                placeholder="enter email"
                type="email"
                value={email}
                error={emailError}
                onChange={handleEmailChange}
                label="Email Id"
            />
            <InputBox 
            name="Password"
                placeholder="enter Password"
                type="Password"
                value={password}
                error={passwordError}
                onChange={handlePassChange}
                label="Password"
            />
            <button className="bg-primary text-white rounded-full p-2 w-full hover:bg-red-600 text-xl">Login</button>
            <div className="mt-2 text-center p-2">
                Don't have an Account yet? <Link to={'/register'} className="text-cyan-400 hover:text-cyan-800 underline"  > Register now  </Link>
            </div>
        </form>
    </div>
}