"use client";

import { useState, useEffect} from "react";
import { useRouter } from "next/navigation";
import AuthenticateCard from "../authenticateCard";
import TopRightPopup from "../topRightPopup/topRightPopup";

export default function Signup(){
  const [show, setShow] = useState(true);
  const [popupMessage, setPopupMessage] = useState(null);
  const router = useRouter();

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

    const res = await fetch('https://myapp-64rs.onrender.com/api/signup',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name: name,username: username, email: email, password: password, code: roomCode})
    });
    const data = await res.json();
    console.log(data)
    setPopupMessage(data.response);
    setShow(true);
    if(data.status === 'done'){
      router.push("/login");
    }
  }

  return (
    <div>
      <AuthenticateCard data={signupData} submitForm={submitForm}/>
      {
        popupMessage ? <TopRightPopup
        message={popupMessage}
        duration={10000}
        show={show}
        onClose={() => setShow(false)}
      /> : null
      }
    </div>
  );
}