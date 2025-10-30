'use client';
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Nav from "../nav/nav";
import Search from "./search";
import RightContainer from "../right/rightContainer";
import "./search.css";

export default function SearchPage(){
  const router = useRouter();
  const [fetchData, setFetchData] = useState(null);
  useEffect(()=>{
    const validatePage = async () =>{
      const res = await fetch('http://localhost:8080/api/search-validate',{
        method: 'GET',
        headers: {
          authorization: `${localStorage.getItem('token')}`
        }
      });
      const data = await res.json();
      if(data.res === 'valid'){
        setFetchData(data);
      }
      else{
        router.push('/login');
      }
    }
    validatePage();
  },[]);

  return (
    <div id="search-page">
      <Nav loginCredentials={fetchData}/>
      <Search fetchData={fetchData}/>
      <RightContainer />
    </div>
  );
}