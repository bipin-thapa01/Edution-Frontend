"use client"

import React from "react";
import { useState, useEffect } from "react";

export default function User({params}){
  const {username} = React.use(params);
  const [offset, setOffset] = useState(0);

  useEffect(()=>{
    let fetchUserData = async ()=>{
      const res = await fetch("http://localhost:8080/api/user-profile",{
        method: 'GET',
        headers: {
          offset: `${offset}`,
          username: `${username}`,
          authentication: `${localStorage.getItem('token')}`
        }
      });
      const data = await res.json();
      console.log(data);
    }
    fetchUserData();
  },[username]);
}