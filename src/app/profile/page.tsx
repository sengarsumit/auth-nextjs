"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function ProfilePage() {

    const router=useRouter();
     
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

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 ">  
        <h1>Profile</h1>
        <hr/>
        <p>profile page</p>
        <hr/>
        <button onClick={logout} className="bg-blue-500 mt-4 hover:bg-slate-500 text-white font-bold py-2 px-4">Logout</button>

        </div>
    );
    }