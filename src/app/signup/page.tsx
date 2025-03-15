"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function SignUpPage(){
    const router=useRouter();
    const [user,setUser]=React.useState({
        email:"",
        password:"",
        username:"",
    })
    const [buttonDisabled,setButtonDisabled]=React.useState(false);

    const [loading,setLoading]=React.useState(false);

    const onSignup=async()=>{
        try {
            setLoading(true);
            const reponse=await axios.post("/api/users/signup",user);
            console.log("Signup success",reponse.data);
            router.push("/login")
        } catch (error) {

            console.log("Signup failed",error.message);
            toast.error(error.message);

        }finally{
            setLoading(false);
        }

    }

    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0 && user.username.length>0){
            setButtonDisabled(false)
        }
        else{
            setButtonDisabled(true) 
        }
    },[user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
            <h1>{loading ? "Processing": "Sign Up" }</h1>
            <hr/>
            <label htmlFor="username">Username</label>
            <input 
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"    
            id="username"  
            type="text" value={user.username}
            onChange={(e)=>setUser({...user,username:e.target.value})}
            placeholder="username"
            />
            <label htmlFor="email">Email</label>
            <input 
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"    
            id="email"  
            type="text" value={user.email}
            onChange={(e)=>setUser({...user,email:e.target.value})}
            placeholder="email"
            />
            <label htmlFor="password">Password</label>
            <input 
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"    
            id="password"  
            type="password" value={user.password}
            onChange={(e)=>setUser({...user,password:e.target.value})}
            placeholder="password"
            />

            <button onClick={onSignup} className="text-white bg-gradient-to-r from-[#001E80] via-[#001E80] to-[white] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">{buttonDisabled? "No Signup":"Sign Up"}</button>
            <Link href="/login">visit login page</Link>
          
        </div>
    );
}