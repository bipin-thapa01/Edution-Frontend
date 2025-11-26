import React, { useState, useEffect, useRef } from "react";
import { Ring } from 'ldrs/react';
import Image from "next/image";

export default function Friend({ fetchData }) {

  const [requestData, setRequestData] = useState(null);

  useEffect(() => {
    setRequestData(fetchData);
    console.log(fetchData)
  }, [fetchData]);

  return <div className="middle-container" id="friend-container">
    <div id="friend-page-friend-requests-header">
      <div id="friend-page-friend-requests-header-content">Friend Requests</div>
    </div>
    <div id="friend-page-friend-requests-container">
      {
        requestData && requestData?.friends ? requestData.friends.length > 0 ?
          requestData.friends.map((item, index) => {
            return <div className="friend-page-friend-request" key={index}>
              <div className="friend-page-friend-request-image">
                <Image src={item.imgurl} fill
                  unoptimized style={{ objectFit: 'fit' }} alt="image" />
              </div>
              <div className="friend-page-friend-request-details">
                <div>{item.name}</div>
                <div>@{item.username}</div>
              </div>
              <div className="friend-page-friend-request-button">Accept Request</div>
            </div>
          }) : <div id="friend-page-no-friend">No Friend Requests Available</div> : <div className="friend-page-loader">
            <Ring color="#6614b8" size={30} speed={2} bgOpacity={0.2} />
          </div>
      }
    </div>
  </div>
}