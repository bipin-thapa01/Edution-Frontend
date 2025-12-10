"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Nav from "../nav/nav";
import Settings from "./settings";
import LowerNav from "../lowerNav/lowerNav";
import Navbar from "../popupNav/Navbar";
import './settings.css';

export default function SettingsPage(){
  const router = useRouter();
  const [fetchData, setFetchData] = useState(null);

  useEffect(()=>{
    const fetchData = async () =>{
      const res = await fetch('http://localhost:8080/api/settings',{
        method: 'GET',
        headers: {
          authentication: `${localStorage.getItem("token")}`,
        }
      });
      const data = await res.json();
      setFetchData(data)
      if(data.response === 'invalid'){
        router.push('/login')
      }
    }
    fetchData();
  },[])

  return <div id="settings-page">
    <Nav loginCredentials={fetchData}/>
    <Settings fetchData={fetchData}/>
    <LowerNav/>
    <Navbar/>
  </div>
}