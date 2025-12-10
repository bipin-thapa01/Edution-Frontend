'use client'

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Nav from "../nav/nav";
import Message from "./message";
import LowerNav from "../lowerNav/lowerNav";
import Navbar from "../popupNav/Navbar";
import './messages.css';

export default function MessagePage() {
  const router = useRouter();
  const [fetchData, setFetchData] = useState(null);
  const lowerNav = useRef();
  const navBar = useRef();
  const floatingMenu = useRef();

  useEffect(() => {
    let fetchUserData = async () => {
      const res = await fetch("https://myapp-t7qu.onrender.com/api/message-fetch", {
        method: 'GET',
        headers: {
          authentication: `${localStorage.getItem('token')}`
        }
      });
      const data = await res.json();
      if (data.response === 'invalid') {
        router.push('/login')
      }

      console.log(data)
      setFetchData(data);
    }
    fetchUserData();
  }, [])

  return <div id="messages-page">
    <Nav loginCredentials={fetchData} />
    <Message fetchData={fetchData} lowerNav={lowerNav} navBar={navBar} floatingMenu={floatingMenu}/>
    <LowerNav lowerNav={lowerNav}/>
    <Navbar navBar={navBar} floatingMenu={floatingMenu}/>
  </div>
}