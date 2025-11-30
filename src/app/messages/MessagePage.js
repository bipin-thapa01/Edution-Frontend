'use client'

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Nav from "../nav/nav";
import Message from "./message";
import './messages.css';

export default function MessagePage() {
  const router = useRouter();
  const [fetchData, setFetchData] = useState(null);

  useEffect(() => {
    let fetchUserData = async () => {
      const res = await fetch("http://localhost:8080/api/message-fetch", {
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
    <Message fetchData={fetchData} />
  </div>
}