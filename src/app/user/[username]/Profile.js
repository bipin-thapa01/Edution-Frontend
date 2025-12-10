"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProfilePage from "./ProfilePage";
import Nav from "@/app/nav/nav";
import LowerNav from "@/app/lowerNav/lowerNav";
import './profile.css';

export default function Profile({ username }) {
  const [offset, setOffset] = useState(0);
  const [profileData, setProfileData] = useState(null);
  const [userDTO, setUserDTO] = useState(null);

  const router = useRouter();

  useEffect(() => {
    let fetchUserData = async () => {
      const res = await fetch("https://myapp-t7qu.onrender.com/api/user-profile", {
        method: 'GET',
        headers: {
          offset: `${offset}`,
          username: `${username}`,
          authentication: `${localStorage.getItem('token')}`
        }
      });
      const data = await res.json();
      console.log(data)
      setProfileData(data);
      setUserDTO(data.userDTO);
    }
    fetchUserData();
  }, [username]);

  useEffect(()=>{
    if(profileData?.response === 'invalid'){
      router.push('/login');
    }
    else if(profileData?.response === 'not found'){

    }
  },[profileData])

  return <div id="user-profile">
    <Nav loginCredentials={profileData} />
    <ProfilePage profileData={profileData}/>
    <LowerNav />
  </div>
}