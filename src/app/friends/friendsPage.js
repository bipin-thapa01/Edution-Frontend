"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Nav from "../nav/nav";
import Friend from "./friend";
import LowerNav from "../lowerNav/lowerNav";
import Navbar from "../popupNav/Navbar";
import './friend.css';

export default function FriendsPage() {
  const router = useRouter();
  const [fetchData, setFetchData] = useState(null);

  useEffect(() => {
    const fetchFriendsData = async () => {
      const res = await fetch('https://myapp-t7qu.onrender.com/api/fetch-friend-page', {
        method: 'GET',
        headers: {
          authorization: `${localStorage.getItem('token')}`
        }
      });
      const data = await res.json();
      setFetchData(data);
      console.log(data);
    }
    fetchFriendsData();
  }, []);

  useEffect(() => {
    if (fetchData && fetchData?.response === 'invalid') {
      router.push('/login');
    }
  }, [fetchData]);

  return <div id="user-friend-page">
    <Nav loginCredentials={fetchData} />
    <Friend fetchData={fetchData}/>
    <LowerNav />
    <Navbar />
  </div>
}