import React, { useState, useEffect, useRef } from "react";
import { Ring } from 'ldrs/react';
import Image from "next/image";

export default function Friend({ fetchData }) {
  const acceptButton = useRef();
  const declineButton = useRef();
  const [requestData, setRequestData] = useState(null);

  useEffect(() => {
    setRequestData(fetchData);
    console.log(fetchData)
  }, [fetchData]);

  const modifyRequest = async (type,index) =>{
    if(type === 'accepted'){
      const res = await fetch('https://myapp-64rs.onrender.com/api/update-request',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: `${fetchData?.friends[index].username}`,
          source: `${fetchData?.user.username}`,
          response: `${type}`,
        })
      });
      const data = await res.json();
      if(data.response === 'success' && acceptButton.current !== undefined){
        acceptButton.current.innerText = 'Accepted✅';
        acceptButton.current.style.backgroundColor = '#131314';
        setTimeout(()=>{
          setRequestData(prev => ({
            ...prev,
            friends: prev.friends.filter((_, i) => i !== index)
          }));
        },2000)
      }
    }
    else{
      const res = await fetch('https://myapp-64rs.onrender.com/api/unfriend',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: `${fetchData?.friends[index].username}`,
          friendUsername: `${fetchData?.user.username}`,
          source: 'declined'
        })
      });
      const data = await res.json();
      if(data.response === 'success' && declineButton.current !== undefined){
        declineButton.current.innerText = 'Declined❌';
        declineButton.current.style.backgroundColor = '#131314';
        setTimeout(()=>{
          setRequestData(prev => ({
            ...prev,
            friends: prev.friends.filter((_, i) => i !== index)
          }));
        },2000)
      }
    }
  }

  return <div className="middle-container" id="friend-container">
    <div id="friend-page-friend-requests-header">
      <div id="friend-page-friend-requests-header-content">Friend Requests</div>
    </div>
    <div id="friend-page-friend-requests-container">
      {
        requestData && requestData?.friends ? requestData.friends.length > 0 ?
          requestData.friends.map((item, index) => {
            return <div className="friend-page-friend-request" key={index} id={`friend-page-friend-request${index}`}>
              <div className="friend-page-friend-request-image">
                <Image src={item.imgurl} fill
                  unoptimized style={{ objectFit: 'cover' }} alt="image" />
              </div>
              <div className="friend-page-friend-request-details">
                <div>{item.name}</div>
                <div>@{item.username}</div>
              </div>
              <div className="friend-page-friend-request-buttons">
                <div ref={acceptButton} onClick={()=>modifyRequest("accepted",index)} className="friend-page-friend-request-button-accept">Accept Request</div>
                <div ref={declineButton} onClick={()=>modifyRequest("declined",index)} className="friend-page-friend-request-button-decline">Decline Request</div>
              </div>
            </div>
          }) : <div id="friend-page-no-friend">No Friend Requests Available</div> : <div className="friend-page-loader">
          <Ring color="#6614b8" size={30} speed={2} bgOpacity={0.2} />
        </div>
      }
    </div>
  </div>
}