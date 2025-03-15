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
        <div className="flex flex-col items-center justify-center min-h-screen py-6  ">  
       <h1 className="text-9xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-yellow-400 to-[#001E80] text-transparent bg-clip-text  mb-10">
            Profile Details
            </h1>
        <hr/>
        <h2 className=" border-white   p-1">User Id : {data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data} </Link>}</h2>
        <hr/>
        

        <button onClick={getUserDetails} className="bg-gradient-to-b from-purple-500 to-[#001E80] mt-4 hover:bg-purple-600 text-white font-bold py-2 px-4">GetUser ID</button>
        <button onClick={logout} className="bg-gradient-to-b from-white to-[#001E80] mt-4 hover:bg-slate-500 text-white font-bold py-2 px-4">Logout</button>

        </div>
    );
    }