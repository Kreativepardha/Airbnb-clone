import { Link, useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { authState, isAuthenticatedState } from "../state/authState"
import axios from "axios"
import { BACKEND_URL } from "../config"



export const Header = () => {

  const isAuthenticated = useRecoilValue(isAuthenticatedState)
  const auth = useRecoilValue(authState)
  const navigate = useNavigate()
  const userName = auth?.name ? auth.name[0] : "";
  
  const handleLogout = async (e: any) => {
    e.preventDefault()
    console.log("logoutiniti")
    try {
      const token = sessionStorage.getItem('token')
      console.log(token )
      await axios.get(`${BACKEND_URL}/user/logout`,{
        headers:{
          Authorization:  token,
        }
      })
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('user')
      navigate('/login')
    } catch (err) {
      console.error("Logout error:", err); 
    }
  }
       return <header className=" p-4 flex bg-slate-100 bg-opacity-85  justify-between capitalize border-b-2 border-slate-100">
            <a href="" className="flex items-center gap-1">
                <svg enableBackground="new 0 0 1991.3 2143.2" viewBox="0 0 1991.3 2143.2" xmlns="http://www.w3.org/2000/svg" 
                className="w-8 h-8">
                <path d="m1851.6 1735.6c-15 111.6-90.1 208.1-195.2 251-51.5 21.4-107.3 27.9-163.1 21.4-53.6-6.4-107.3-23.6-163-55.7-77.2-43-154.5-109.4-244.6-208.1 141.6-173.8 227.4-332.5 259.6-474.1 15-66.5 17.2-126.6 10.7-182.4-8.6-53.6-27.9-103-57.9-145.9-66.5-96.5-178.1-152.3-302.5-152.3s-236 57.9-302.5 152.3c-30 42.9-49.3 92.3-57.9 145.9-8.6 55.8-6.4 118 10.7 182.4 32.2 141.6 120.1 302.5 259.6 476.2-88 98.7-167.3 165.2-244.6 208.1-55.8 32.2-109.4 49.4-163 55.8-55.3 6.2-111.2-1.2-163-21.4-105.1-42.9-180.2-139.5-195.2-251-6.4-53.6-2.1-107.2 19.3-167.3 6.4-21.5 17.2-42.9 27.9-68.6 15-34.3 32.2-70.8 49.3-107.3l2.2-4.3c148-319.7 306.8-645.8 472-963.3l6.4-12.9c17.2-32.1 34.3-66.5 51.5-98.7 17.2-34.3 36.5-66.5 60.1-94.4 45.1-51.5 105.1-79.4 171.6-79.4s126.6 27.9 171.6 79.4c23.6 27.9 42.9 60.1 60.1 94.4 17.2 32.2 34.3 66.5 51.5 98.6l6.5 12.9c163 319.6 321.8 645.7 469.8 965.4v2.1c17.2 34.3 32.2 73 49.3 107.3 10.7 25.8 21.5 47.2 27.9 68.6 17.1 55.9 23.5 109.5 14.9 165.3zm-856-100.9c-115.8-145.9-190.9-283.2-216.7-399-10.7-49.4-12.9-92.3-6.4-130.9 4.3-34.3 17.2-64.4 34.3-90.1 40.8-57.9 109.4-94.4 188.8-94.4s150.2 34.4 188.8 94.4c17.2 25.8 30 55.8 34.3 90.1 6.4 38.6 4.3 83.7-6.4 130.9-25.7 113.7-100.8 251-216.7 399zm967.6-111.5c-10.7-25.7-21.5-53.6-32.2-77.2-17.2-38.6-34.3-75.1-49.4-109.4l-2.1-2.1c-148-321.8-306.8-647.9-474.1-969.7l-6.4-12.9c-17.2-32.2-34.3-66.5-51.5-100.8-21.5-38.6-42.9-79.4-77.2-118-68.7-85.9-167.4-133.1-272.5-133.1-107.3 0-203.8 47.2-274.7 128.7-32.2 38.6-55.8 79.4-77.2 118-17.2 34.3-34.3 68.6-51.5 100.8l-6.4 12.8c-165.2 321.8-326.1 647.9-474.1 969.7l-2.1 4.3c-15 34.3-32.2 70.8-49.4 109.4-11.5 25.4-22.2 51.2-32.2 77.2-27.9 79.4-36.5 154.5-25.8 231.7 23.6 160.9 130.9 296.1 278.9 356.1 55.8 23.6 113.7 34.3 173.8 34.3 17.2 0 38.6-2.1 55.8-4.3 70.8-8.6 143.7-32.1 214.5-72.9 88-49.3 171.6-120.1 266-223.1 94.4 103 180.2 173.8 266 223.1 70.8 40.8 143.7 64.3 214.5 72.9 17.2 2.2 38.6 4.3 55.8 4.3 60.1 0 120.1-10.7 173.8-34.3 150.2-60.1 255.3-197.4 278.9-356.1 17.2-75 8.6-150-19.2-229.4z" fill="#e0565b"/>
                </svg>
                {/*  */}
            <span   className="font-bold  text-xl">Airbnb</span>
            </a>
                <div className="flex items-center  gap-2 border border-gray-200 shadow-md shadow-gray-300 font-semibold bg-white rounded-full py-2 px-4 transition-all  cursor-pointer hover:shadow-lg hover:transition-all ">
                        <div className="hover:bg-slate-200 hover:rounded-full hover:text-black   ">Anywhere </div>
                        <div className="border-r-2 border-slate-200 "></div>
                        <div className="hover:bg-slate-200 hover:rounded-full hover:text-black  ">Any week</div>
                        <div className="border-l-2 border-slate-200"></div>
                        <div className="hover:bg-slate-200 hover:rounded-full hover:text-black  ">add guests</div>
                        <button className="rounded-full bg-primary py-1 px-2 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                         className="size-4">
         <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
              </button>
                </div>
        <div className="flex items-center gap-2 border border-gray-200  font-semibold bg-white rounded-full py-2 px-4 cursor-pointer  hover:shadow-md border-none transition-all">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>

{
  isAuthenticated ? (
    <>
    <div className="relative group">
                            <span className="flex cursor-pointer hover:bg-opacity-35 group-hover:text-black p-2  hover:bg-sky-500 group-hover:bg-opacity-65 w-10 text-center rounded-full bg-sky-400 text-black">
                                       <div className="ml-2 text-base">
                                          {userName}
                                       </div>
                            </span>
                            <div className="absolute  right-0 top-9 hidden w-auto flex-col gap-1 rounded-lg bg-white py-4 shadow-md transition-all group-hover:flex">
                                <Link to="/" className="flex items-center py-1 pl-6 pr-8 text-neutral-400 hover:text-black">
                                    <span className="whitespace-nowrap pl-3 ">Messages</span>
                                </Link>
                                <Link to="/" className="flex items-center py-1 pl-6 pr-8 text-neutral-400 hover:text-black">
                                    <span className="whitespace-nowrap pl-3 ">trips</span>
                                </Link>
                                <Link to="/" className="flex items-center py-1 pl-6 pr-8 text-neutral-400 hover:text-black">
                                    <span className="whitespace-nowrap pl-3 ">wishlist</span>
                                </Link>
                                <div className="flex items-center py-1 pl-6 pr-8 text-neutral-400 hover:text-black" onClick={handleLogout}>
                                    <span className="whitespace-nowrap pl-3 border-t-2  px-8 " >logout</span>
                                </div>
                            </div>
                        </div>
                          {/* ADD LOGOUT FUNCTIONALITY  */}
  {/* <div className=""> Logout </div>  */}
    </>
  ) : (<>
   <div className="relative group">
                            <p className="flex items-center  cursor-pointer hover:bg-opacity-35 group-hover:text-black text-gray-500 p-2 hover:bg-white group-hover:bg-opacity-65  bg-slate-200 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 relative ">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
  </svg> 
                            </p>
                            <div className="absolute  right-0 top-9 hidden w-auto flex-col gap-1 rounded-lg bg-white py-4 shadow-md transition-all group-hover:flex">
                                <Link to="/login" className="flex items-center py-1 pl-6 pr-8 text-neutral-400 hover:text-black">
                                    <span className="whitespace-nowrap pl-3 ">Log in</span>
                                </Link>
                                <Link to="/register" className="flex items-center py-1 pl-6 pr-8 text-neutral-400 hover:text-black">
                                    <span className="whitespace-nowrap pl-3 ">sign up </span>
                                </Link>
                                <Link to="/" className="flex items-center py-1 pl-6 pr-8 text-neutral-400 hover:text-black">
                                    <span className="whitespace-nowrap pl-3 px-4 border-t">airbnb your home</span>
                                </Link>
                                <Link to="/" className="flex items-center py-1 pl-6 pr-8 text-neutral-400 hover:text-black">
                                    <span className="whitespace-nowrap pl-3   px-8 ">help center</span>
                                </Link>
                            </div>
                        </div>
    </>
  )
}
        </div>  
    
    </header>
}