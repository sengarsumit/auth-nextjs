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
        // <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
        //     <h1>{loading ? "Processing": "Sign Up" }</h1>
        //     <hr/>
        //     <label htmlFor="username">Username</label>
        //     <input 
        //     className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"    
        //     id="username"  
        //     type="text" value={user.username}
        //     onChange={(e)=>setUser({...user,username:e.target.value})}
        //     placeholder="username"
        //     />
        //     <label htmlFor="email">Email</label>
        //     <input 
        //     className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"    
        //     id="email"  
        //     type="text" value={user.email}
        //     onChange={(e)=>setUser({...user,email:e.target.value})}
        //     placeholder="email"
        //     />
        //     <label htmlFor="password">Password</label>
        //     <input 
        //     className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"    
        //     id="password"  
        //     type="password" value={user.password}
        //     onChange={(e)=>setUser({...user,password:e.target.value})}
        //     placeholder="password"
        //     />

        //     <button onClick={onSignup} className="text-white bg-gradient-to-r from-[#001E80] via-[#001E80] to-[white] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">{buttonDisabled? "No Signup":"Sign Up"}</button>
        //     <Link href="/login">visit login page</Link>
          
        // </div>
        <>
         <div className="bg-balck dark:bg-black">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
     
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-black dark:border-white">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {loading ? "Processing": "Sign Up" }
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
              <div>
                      <label  htmlFor="UserName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                      <input id="username" type="text" value={user.username} onChange={(e)=>setUser({...user,username:e.target.value})} placeholder="username" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  </div>
                  <div>
                      <label  htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input id="email" type="text" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})}  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input  id="password" type="password" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  </div>
                  
                  <button onClick={onSignup} className="w-full text-white bg-gradient-to-r from-[#001E80] via-[#001E80] to-[white] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{buttonDisabled? "Enter Details":"Sign Up"}</button>
              </form>
              
          </div>
      </div>
  </div>
</div>
        </>
        
    );
}