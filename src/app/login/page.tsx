"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import  axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage(){
    const router=useRouter();
    const [user,setUser]=React.useState({
        email:"",
        password:"",
    })
    const [buttonDisabled,setButtonDisabled]=React.useState(false);
    const [loading,setLoading]=React.useState(false);

    const onLogin=async()=>{
        try {
            setLoading(true);
            const response=await axios.post("/api/users/login",user);
            console.log("login successfull",response.data);
            toast.success(response.data.message);
            router.push("/profile");
            
        } catch (error: any) {
            console.log("login failed",error.message);
            toast.error(error.message);          
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    },[user]);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
            <h1>{loading ? "Processing" : "Login" }</h1>
            <hr/>
           
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

            <button onClick={onLogin} className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">{buttonDisabled? "enter Details":"Login"}</button>
            <Link href="/signup">visit signup page</Link>
          
        </div>
    );
}