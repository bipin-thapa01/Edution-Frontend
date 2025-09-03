import { useState, useEffect } from "react";
import Image from "next/image";

export default function FriendRequestPopup({ feedData, friendRequestPopup }) {
  const [friendRequests, setFriendRequests] = useState(null);
  const fetchFriendDetails = async () => {
    if (feedData && feedData.user) {
      const res = await fetch('http://localhost:8080/api/friends',
        {
          method: 'GET',
          headers: {
            email: `${feedData.user.email}`,
          }
        });
      const data = await res.json();
      setFriendRequests(data);
    }
    else {
      setFriendRequests(null);
    }
  }

  useEffect(() => {
    fetchFriendDetails();
  }, []);

  const findDuration = (date)=>{
    const iso = date.replace(" ","T")
      const requestTime = new Date(iso);
      const now = new Date();
      const diff = now - requestTime;
      console.log(diff)
      if(diff/(1000*60*60*24*30*12) >= 1){
        return `${Math.floor(diff/(1000*60*60*24*30*12))} years`;
      }
      else if(diff/(1000*60*60*24*30) >= 1){
        return `${Math.floor(diff/(1000*60*60*24*30))} months`;
      }
      else if(diff/(1000*60*60*24) >= 1){
        return `${Math.floor(diff/(1000*60*60*24))} days`;
      }
      else if(diff/(1000*60*60) >= 1){
        return `${Math.floor(diff/(1000*60*60))} hr`;
      }
      else if(diff/(1000*60) >= 1){
        return `${Math.floor(diff/(1000*60))} min`;
      }
      else{
        return `${Math.floor(diff/(1000))} sec`;
      }
  }

  return <div id="friend-request-popup" ref={friendRequestPopup}>
    {
      friendRequests ? (friendRequests.response == 'available' ? (friendRequests.users.map((item, index) => {
        return <div key={index} className="friend-request-card temp-color">
          <Image src={item.imgurl} alt="logo"
            width={100} height={100} className="friend-request-logo" />
          <div className="temp-color friend-request-card-details-container">
            <div className="friend-request-card-details temp-color">
              <div className="friend-request-card-title temp-color">{item.name} sent you friend request</div>
              <div className="friend-request-card-room-code temp-color">Room code: {item.roomCode}</div>
              <div className="friend-request-card-time temp-color">{findDuration(item.date)}    ago</div>
            </div>
            <div className="friend-request-card-buttons temp-color">
              <button className="friend-request-card-button friend-request-card-button1">Accept</button>
              <button className="friend-request-card-button friend-request-card-button2">Decline</button>
            </div>
          </div>
        </div>
      })) : (<div>No Friend Requests</div>)) : (<div>Login</div>)
    }
  </div>
}