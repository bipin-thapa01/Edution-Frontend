"use client";

import { useRouter } from "next/navigation";
import AuthenticateCard from "../authenticateCard";
import "../global.css";

export default function Login(){
  const router = useRouter();
  const signupData = {
    type: "login",
    alt: "SinUp",
    ask: "Welcome back!",
    buttonText: "Login into your account",
    altOption: "or Signup",
    altLink: "/signup",
  }

  const submitForm = async (e) =>{
    e.preventDefault();
    const email = e.currentTarget.querySelector('#email').value;
    const password = e.currentTarget.querySelector('#password').value;

    const res = await fetch('http://localhost:8080/api/login',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: email, password: password})
    });
    const data = await res.json();
    if(data.error){
      console.log(data.error)
    }
    else{
      localStorage.removeItem('token');
      localStorage.setItem('token',data.token);
      router.push('/');
    }
  }

  return (
    <div>
      <AuthenticateCard data={signupData} submitForm={submitForm}/>
    </div>
  );
}