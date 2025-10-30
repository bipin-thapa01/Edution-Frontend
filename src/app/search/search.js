import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Ring } from 'ldrs/react';
import Image from "next/image";

export default function Search({fetchData}) {

  const [data,setData] = useState(null);

  useEffect(()=>{
    if (!fetchData) return;

    setData(fetchData.userDTOs);
    console.log(fetchData.userDTOs);
  },[fetchData])

  return (
    <div className="middle-container">
      <div id="search-container">
        <FaSearch />
        <input id="search" type="text" placeholder="Search" autoComplete="off" />
      </div>
      <div>
        <div>

        </div>
        <div>
          {
            data ? data.map((item,index)=>{
              return <div key={index}>
                <div className="user-profile">
                  <Image className="profile-image" fill src={item.imgurl} alt="profile url"/>
                </div>
                <div>
                  <div>{item.name}</div>
                  <div>{item.username}</div>
                </div>
              </div>
            }) : <div>
              <Ring color="#6614b8" size={30} speed={2} bgOpacity={0.2} />
            </div>
          }
        </div>
      </div>
    </div>
  );
}