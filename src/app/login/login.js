"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthenticateCard from "../authenticateCard";
import TopRightPopup from "../topRightPopup/topRightPopup";
import "../global.css";

export default function Login() {
  const [show, setShow] = useState(true);
  const [popupMessage, setPopupMessage] = useState(null);

  const router = useRouter();
  const signupData = {
    type: "login",
    alt: "SinUp",
    ask: "Welcome back!",
    buttonText: "Login into your account",
    altOption: "or Signup",
    altLink: "/signup",
  }

  const submitForm = async (e) => {
    e.preventDefault();
    const temp = e.currentTarget.querySelector('#email').value.trim();
    let email;
    let username;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(temp)) {
      email = temp;
    }
    else {
      username = temp;
    }
    const password = e.currentTarget.querySelector('#password').value;
    const res = await fetch('https://myapp-64rs.onrender.com/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, username: username, password: password })
    });
    const data = await res.json();
    if (data.error) {
      console.log(data.error);
      setPopupMessage(data.error);
      setShow(true);
    }
    else {
      localStorage.removeItem('token');
      localStorage.setItem('token', data.token);
      router.push('/');
    }
  }

  return (
    <div>
      <AuthenticateCard data={signupData} submitForm={submitForm} />
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