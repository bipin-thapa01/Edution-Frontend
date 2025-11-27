"use client";

import { useState, useEffect } from "react";
import Nav from "../nav/nav";
import Settings from "./settings";
import './settings.css';

export default function SettingsPage(){

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
    }
    fetchData();
  },[])

  return <div id="settings-page">
    <Nav loginCredentials={fetchData}/>
    <Settings fetchData={fetchData}/>
  </div>
}