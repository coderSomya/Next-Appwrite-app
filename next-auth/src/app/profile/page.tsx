"use client";
import React from "react";
import axios from "axios";
import Link from "next/link"
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage (){
    const router = useRouter()
    const [data, setData] = React.useState("");
    const Logout = async ()=>{
          try {
             const response = await axios.get("/api/users/logout")
             toast.success("Successfully logged out");
             router.push('/signup')
          } catch (error: any) {
            console.log(error); 
            toast.error("Something went wrong")
          }
    }

    const getDetails = async ()=>{
        const res = await axios.get("/api/users/me");
        setData(res.data.data._id)
        console.log(res.data.data);
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 text-2xl">
   <h1>Profile</h1>
       <hr />

       <h1>Profile page</h1>
       <h2>{data? "" : <Link
       href={`/profile/${data}`}
       >
       </Link>
       }</h2>
       <hr/>
       <button className="bg-red-500 px-3 py-2 text-white font-bold rounded my-3"
       onClick={Logout}
       >Logout</button>
       <button className="bg-blue-500 px-3 py-2 text-white"
       onClick={getDetails}>Get Details</button>
    </div>
    )
}