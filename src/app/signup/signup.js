"use client";

import { useState, useEffect } from "react";
import AuthenticateCard from "../authenticateCard";

export default function Signup(){

  const signupData = {
    type: "signup",
    alt: "Login",
    ask: "New Here?",
    buttonText: "Create Your Account",
    altOption: "or Login",
    altLink: "/login",
  }

  const submitForm = async (e) =>{
    e.preventDefault();
    const name = e.currentTarget.querySelector('#name').value;
    const username = e.currentTarget.querySelector('#username').value;
    const email = e.currentTarget.querySelector('#email').value;
    const password = e.currentTarget.querySelector('#password').value;
    const roomCode = e.currentTarget.querySelector('#room-code').value;

    const res = await fetch('http://localhost:8080/api/signup',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name: name,username: username, email: email, password: password, code: roomCode})
    });
    const data = await res.json();
    console.log(data);
  }

  return (
    <div>
      <AuthenticateCard data={signupData} submitForm={submitForm}/>
    </div>
  );
}