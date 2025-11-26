import { useState, useEffect, useRef } from "react";
import Posts from "@/app/post/posts";
import { Ring } from 'ldrs/react'
import 'ldrs/react/Ring.css'
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";
import './profile.css';

export default function ProfilePage({ profileData }) {
  const [friendData, setFriendData] = useState(null);
  const [checkFriend, setCheckFriend] = useState(null);
  const [tabContent, setTabContent] = useState(<div>Loading...</div>);
  const friendButton = useRef();
  const postTab = useRef();
  const friendTab = useRef();

  const convertTime = (date) => {
    const joined = new Date(date);
    const monthYear = joined.toLocaleString("en-US", {
      month: "short",
      year: "numeric"
    });
    return monthYear;
  }

  const isFriend = async (username, friendUsername) => {
    const res = await fetch("http://localhost:8080/api/is-friend", {
      method: 'GET',
      headers: {
        username: `${username}`,
        friend: `${friendUsername}`
      }
    });
    const data = await res.json();
    if (data.response === 'accepted') {
      setCheckFriend("Friends");
    }
    else if (data.response === 'pending') {
      setCheckFriend("Request Sent");
    }
    else {
      setCheckFriend("Send Request");
      if (friendButton.current !== undefined) {
        friendButton.current.style.color = 'black';
        friendButton.current.style.backgroundColor = '#b2b2b2';
      }
    }
  }

  const mouseEnterAction = (e) => {
    const text = e.currentTarget.innerText;
    if (text === 'Friends') {
      e.currentTarget.innerText = 'Unfriend';
    }
    else if (text === 'Request Sent') {
      e.currentTarget.innerText = 'Cancel Request';
    }
  }

  const mouseLeaveAction = (e) => {
    const text = e.currentTarget.innerText;
    if (text === 'Unfriend') {
      e.currentTarget.innerText = 'Friends';
    }
    else if (text === 'Cancel Request') {
      e.currentTarget.innerText = 'Request Sent';
    }
  }

  const clickAction = async (e) => {
    const text = e.currentTarget.innerText;
    if (text === 'Unfriend' || text === 'Cancel Request') {
      const res = await fetch("http://localhost:8080/api/unfriend", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: `${profileData.userDTO.username}`,
          friendUsername: `${profileData.friendDTO.username}`
        })
      });
      const data = await res.json();
      if (data.response === 'success') {
        friendButton.current.innerText = 'Send Request';
        friendButton.current.style.color = 'black';
        friendButton.current.style.backgroundColor = '#b2b2b2';
      }
    }
    else {
      const res = await fetch("http://localhost:8080/api/send-request", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: `${profileData.userDTO.username}`,
          friendUsername: `${profileData.friendDTO.username}`
        })
      });
      const data = await res.json();
      if (data.response === 'success') {
        if (friendButton.current !== undefined) {
          friendButton.current.innerText = 'Request Sent';
          friendButton.current.style.color = '#b2b2b2';
          friendButton.current.style.backgroundColor = '#131314';
        }
      }
    }
  }

  useEffect(() => {
    if (profileData?.friendDTO && profileData?.userDTO) {
      setFriendData(profileData.friendDTO);
      isFriend(profileData.userDTO.username, profileData.friendDTO.username);
      setTabContent(<Posts post={profileData.postDTOs} />);
    }
    console.log(profileData);
  }, [profileData]);

  const displayFriendList = (friendDTOs) => {
    if (friendDTOs && friendDTOs.length > 0) {
      return friendDTOs.map((item, index) => (
        <div className="profile-friends-container" key={index}>
          <div id="profile-friends-profile">
            <Image
              src={item.imgurl}
              alt="userImage"
              fill
              unoptimized
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="profile-friends-details">
            <div>{item.name}</div>
            <div className="profile-friends-username">@{item.username}</div>
          </div>
        </div>
      ));
    } else {
      return <div>Empty Friend List</div>;
    }
  };
  

  const updateTabData = (e) => {
    if (postTab.current !== undefined && friendTab.current !== undefined) {
      if (e.currentTarget.innerText === 'Posts') {
        setTabContent(<Posts post={profileData.postDTOs} />);
        postTab.current.style.setProperty('--tab-header1', 'block');
        friendTab.current.style.setProperty('--tab-header2','none');
      }
      else {
        setTabContent(displayFriendList(profileData.friendDTOs));
        postTab.current.style.setProperty('--tab-header1', 'none');
        friendTab.current.style.setProperty('--tab-header2','block');
      }
    }
  }

  return <div id="profile-page" className="middle-container">
    {
      friendData ?
        (<div>
          <div id="user-profile-header">
            <FaArrowLeft />
            <div id="user-profile-header-info">
              <div id="user-profile-header-name">{friendData.name}</div>
              <div id="user-profile-header-post-count">{profileData.postDTOs.length} posts</div>
            </div>
          </div>
          <div id="user-profile-background">
            <Image src={`${friendData.backgroundImage}`} fill unoptimized alt="background image" style={{ objectFit: 'cover' }} />
          </div>
          <div id="user-profile-image">
            <Image src={`${friendData.imgurl}`} fill unoptimized alt="background image" style={{ objectFit: 'cover' }} />
          </div>
          <div id="user-profile-details">
            {
              profileData.isFriend ?
                <div id="profile-request-button" ref={friendButton} onMouseEnter={mouseEnterAction} onMouseLeave={mouseLeaveAction} onClick={clickAction}>{checkFriend ? checkFriend : "Loading..."}</div>
                : null
            }
            <div id="user-profile-details-name">
              {friendData.name}
            </div>
            <div id="user-profile-details-username">
              @{friendData.username}
            </div>
            <div id="user-profile-details-join">
              Joined on {convertTime(friendData.date)}
            </div>
            <div id="user-profile-details-friends">
              <span style={{ color: 'white' }}>{profileData.friendCount}</span> Friends
            </div>
            <div id="user-profile-details-bio">Bio: {friendData.bio ? friendData.bio : "Nothing added yet."}</div>
          </div>
          <div id="user-profile-content">
            <div id="user-profile-content-tabs-header">
              <div id="user-profile-content-tabs-header1" ref={postTab} onClick={updateTabData}>Posts</div>
              <div id="user-profile-content-tabs-header2" ref={friendTab} onClick={updateTabData}>Friend List</div>
            </div>
            <div id="user-profile-tab-content">{tabContent}</div>
          </div>
        </div>) :
        (<div id="user-profile-load">
          <Ring color="#6614b8" size={30} speed={2} bgOpacity={0.2} />
        </div>)
    }
  </div>
}