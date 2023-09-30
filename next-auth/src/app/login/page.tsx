"use client";

import Link from "next/link";
import React from "react";
import {useRouter, useSearchParams} from "next/navigation";
import axios from "axios"
import {Toaster, toast} from "react-hot-toast";
import { NextRequest } from "next/server";

export default function LoginPage(){  
    const [user, setUser] = React.useState({
        email: "",
        password:"",
    })

    const onLogin = async()=>{

    }


    return (
       <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>Login</h1>
        <hr />
    

        <label htmlFor="email">email</label>
        <input className="text-black px-1" type="email" id="email" value={user.email} onChange={(e)=>
        setUser({...user, email: e.target.value})}
        placeholder="email"
        />

        <label htmlFor="password">password</label>
        <input className="text-black px-1" type="password" id="password" value={user.password} onChange={(e)=>
        setUser({...user, password: e.target.value})}
        placeholder="password"
        />
        
       <button
       className="my-3 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
       onClick={onLogin}
       >Login</button>

       <Link href="/signup">Signup first</Link>
       </div>

    );
}