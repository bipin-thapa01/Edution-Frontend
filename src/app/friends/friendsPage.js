"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Nav from "../nav/nav";
import LowerNav from "../lowerNav/lowerNav";
import RightContainer from "../right/rightContainer";

export default function FriendsPage(){
  const router = useRouter();
  const [fetchData, setFetchData] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(()=>{
    const fetchFriendsData = async ()=>{
      const res = await fetch('http://localhost:8080/api/fetch-friend-page',{
        method: 'GET',
        headers: {
          authorization: `${localStorage.getItem('token')}`
        }
      });
      const data = await res.json();
      setUserData(data.user);
      setFetchData(data);
      console.log(data);
    }
    fetchFriendsData();
  },[]);

  useEffect(()=>{
    if(fetchData && fetchData?.response === 'invalid'){
      router.push('/login');
    }
  },[fetchData]);

  return <div>
    {/* <Nav loginCredentials={fetchData}/>
      <RightContainer /> */}
  </div>
}