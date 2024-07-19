import { Link, useParams } from "react-router-dom"
import { InputBox } from "../components/utils/InputBox"
import { ChangeEvent, useState } from "react"
import { PerksLabel } from "../components/PerksLabel"
import axios from "axios"
import { BACKEND_URL } from "../config"


export const Places = () => {
        const [title,setTitle] = useState("")
        const [address,setAddress] = useState("")
        const [addedPhotos,setAddedPhotos] = useState([ ])
        const [photoLink,setPhotoLink] = useState('')
        const [description,setDescription] = useState('')
        const [perks,setPerks] = useState([])
        const [extraInfo,setExtraInfo] = useState('')
        const [checkIn,setCheckIn] = useState('')
        const [checkOut, setCheckOut] = useState('')
        const [maxGuests,setMaxGuests] = useState(1)
        
        const {action} = useParams()
        console.log(action)

        const addPhotoByLink = async (e) => {
            e.preventDefault();
            try {
                const { data: filename } = await axios.post(`${BACKEND_URL}/place/upload-by-link`, {
                    link: photoLink 
                });
                setAddedPhotos((prev):any => [...prev, filename]);
                setPhotoLink(''); 
            } catch (error) {
                console.error('Error uploading photo:', error);
            }
        };

        return <div className="">
            {action !== 'new' && (

                <div className="text-center mt-4">
                    <Link className="inline-flex gap-1 bg-primary text-white py-2 px-4 rounded-lg"
                     to={'/dashboard/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        Add new Place
                         </Link>
                </div>
                    )}
                    {/*  */}
                    {action === 'new' && (
                        <form>
                                <InputBox type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} label="Title" /> 
                            <InputBox type="text" placeholder="address" value={address} onChange={(e) => setAddress(e.target.value)} label="Title" />
                        <div className="flex gap-2">
                                <div className="w-3/4 ">
                                        <InputBox  type="text" placeholder="Add using a link...jpg" value={photoLink} onChange={(e) => setPhotoLink(e.target.value)} label="Photos"/>
                                    </div>   
                                    <div className=" mt-7">
                                            <button onClick={addPhotoByLink} className="rounded-2xl px-4 py-3 hover:bg-primary hover:text-white  bg-gray-200">add&nbsp;photos</button>
                                        </div> 
                            </div>
                                    <div className="hover:bg-primary   hover:border-none border-2 hover:text-white  text-2xl flex rounded-lg ml-6 text-center p-4 w-56  font-semibold">
                                    {addedPhotos.length > 0 && addedPhotos.map((filename) => (
                                        <div className="" key={filename}>
                                               <img src={`${BACKEND_URL}/uploads/`+ filename  } alt="" />
                                        </div>
                                    ))    }
                                    <button className="flex gap-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-9">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                                                            </svg>
                                                                upload
                                                            </button>
                                                        </div>
                                    <div className="">
                                        <h2 className="text-2xl mt-4 ">Description</h2>
                                        <p className="text-gray-500 text-sm">dexcription of the place</p>
                                        <textarea value={description}  onChange={e => setDescription(e.target.value)}  />
                                        </div>
                                        {/*  */}
                                        <PerksLabel 
                                            selected={perks}
                                            onChange={setPerks}
                                        />
                                        {/*  */}
                                            <div className="">
                                                <h2 className="text-2xl mt-4">Extra Info</h2>
                                                <p className="text-gray-500 text-sm">house rules, etc</p>
                                                        <textarea  value={extraInfo} onChange={e => setExtraInfo(e.target.value)} />
                                                        <h2 className="text-2xl mt-4">Check in&out times, max guests</h2>
                                                        <p className="text-gray-500 text-sm">add check in and out times, remember some time for window </p>
                                                            </div>
                                                            <div className="grid sm:grid-cols-3">
                                                                    <div className="">
                                                                        <h3 className="mt-2 mb-1">Check in time</h3>
                                                                    <input className="border-y" type="text" placeholder="11:00" value={checkIn} onChange={e => setCheckIn(e.target.value)}/>
                                                            </div>
                                                            <div className="">
                                                                <h3 className="mt-2 mb-1">Check out time</h3>
                                                                <input className="border-y" type="text" placeholder="1:00" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
                                                            </div>
                                                            <div className="">
                                                                <h3 className="mt-2 mb-1">Max number of guests</h3>
                                                                <input className="border-y" type="text"  placeholder="4" value={maxGuests} onChange={e => setMaxGuests(e.target.value)}/>
                                                            </div>
                                                        <div className="w-72 ml-60    flex justify-center items-centerf">
                                                        <button className="bg-primary my-4 rounded-lg text-white p-2 text-center w-full">Save</button>
                                                        </div>
                                                                            </div>
                                                                    
                                </form>
                    )}  
        </div>
}