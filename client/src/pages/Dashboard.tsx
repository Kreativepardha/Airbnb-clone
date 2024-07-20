import { useRecoilValue } from "recoil";
import { authState, isAuthenticatedState } from "../state/authState";
import { Link, useNavigate, useParams } from "react-router-dom";
import classNames from "classnames";
import { ProfileCard } from "../components/ProfileCard";
import { Places } from "./Places";




export const Dashboard = () => { 
  const navigate = useNavigate()
  const user = useRecoilValue(isAuthenticatedState)
  const {subpage} =  useParams()
  // const auth = useRecoilValue(authState)

  if(!user) {
    navigate("/login ")
    return null;
  }
  

  const linkClasses = (type:any) => classNames('py-2 px-6 hover:bg-gray-200 rounded-full', {
    'bg-primary text-white rounded-full hover:bg-red-600': type === subpage || (subpage === undefined && type === 'profile')
  });

  return(
    <>
       <div className="mt-4">
          <nav className="b flex justify-evenly ">
            <Link to={'/dashboard/profile'} className={linkClasses('profile')}>
            <div className="flex gap-2">
            My Profile
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </div>
            </Link>
            <Link to={'/dashboard/bookings'} className={linkClasses('bookings')}>
           <div className="flex gap-2">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
            </svg>       
            My bookings
           </div>
            </Link>
            <Link to={'/dashboard/places'} className={linkClasses('places')}>
              <div className="flex gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
            My accomodations  
              </div>
            </Link>
          </nav>
       </div>

       
      {
        subpage === 'profile' && (
          <div className="">
            <ProfileCard />
            </div>
        )
      }
      {
        subpage === 'bookings' && (
          <div className="bg-sky-200">
              ni
          </div>
        )
      }
      {
        subpage === 'places' && (
          <Places />
        )
      }
    </>
    )
    };
