"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Nav from "../nav/nav";
import Bookmark from "./bookmark";
import LowerNav from "../lowerNav/lowerNav";
import Navbar from "../popupNav/Navbar";
import "./bookmark.css";

export default function BookmarkPage(){
  const [bookmarkData, setBookmarkData] = useState(null);
  const [userData, setUserData] = useState(null);

  const router =  useRouter();

  useEffect(()=>{
    const fetchBookmark = async () =>{
      const res = await fetch("https://myapp-t7qu.onrender.com/api/get-bookmarks", {
        method: 'GET',
        headers:{
          token: `${localStorage.getItem("token")}`,
        }
      });
      const data = await res.json();
      if(data.response === 'success'){
        setBookmarkData(data);
        setUserData(data.res);
      }
    }
    fetchBookmark();
  },[]);

  useEffect(()=>{
    if(bookmarkData && bookmarkData?.response !== 'success'){
      router.push('/login');
    }
  },[bookmarkData])

  return(
    <div id="bookmark-page">
      <Nav loginCredentials={userData}/>
      <Bookmark bookmarkData={bookmarkData?.bookmarkDTOs}/>
      <LowerNav />
      <Navbar />
    </div>
  );
}