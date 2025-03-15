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
        <>
        <div className="bg-balck dark:bg-black">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
     
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-black dark:border-white">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {loading ? "Processing" : "Login" }
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label  htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="text" name="email"  value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" value={user.password}   onChange={(e)=>setUser({...user,password:e.target.value})} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  </div>
                  <div className="flex items-center justify-between">
                      <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                  </div>
                  <button onClick={onLogin} className="w-full text-white bg-gradient-to-r from-[#001E80] via-[#001E80] to-[white] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{buttonDisabled? "Enter Details":"Login"}</button>
              </form>
          </div>
      </div>
  </div>
</div>
</>

        
        
    );
}