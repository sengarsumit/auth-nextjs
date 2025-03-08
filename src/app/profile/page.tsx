"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function ProfilePage() {

    const router=useRouter();
     const [data,setData]=useState("nothing");
    const logout=()=>{
        try {
            axios.get("/api/users/logout");
            toast.success("logout successful");
            router.push("/login");            
        } catch ( error: any) {
            console.log("logout failed",error.message);
            toast.error(error.message);    
        }         
    }
    const getUserDetails=async()=>{
        const res=await axios.get('/api/users/me');
        console.log(res.data);
        setData(res.data.data._id);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 ">  
        <h1>Profile</h1>
        <hr/>
        <p>profile page</p>
        <h2 className="padding round bg-green-500 p-1">{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data} </Link>}</h2>
        <hr/>
        <button onClick={logout} className="bg-blue-500 mt-4 hover:bg-slate-500 text-white font-bold py-2 px-4">Logout</button>

        <button onClick={getUserDetails} className="bg-purple-500 mt-4 hover:bg-purple-600 text-white font-bold py-2 px-4">GetUser Details</button>

        </div>
    );
    }