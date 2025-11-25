import { useState, useEffect } from "react";
import { Ring } from 'ldrs/react'
import 'ldrs/react/Ring.css'
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";

export default function ProfilePage({ profileData }) {
  const [friendData, setFriendData] = useState(null);

  useEffect(() => {
    if (profileData) {
      setFriendData(profileData.friendDTO);
    }
    console.log(profileData)
  }, [profileData]);

  const convertTime = (date) => {
    const joined = new Date(date);
    const monthYear = joined.toLocaleString("en-US", {
      month: "short",
      year: "numeric"
    });
    return monthYear;
  }

  return <div id="profile-page" className="middle-container">
    {
      friendData ? (<div>
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
          <div id="user-profile-details-name">
            {friendData.name}
          </div>
          <div id="user-profile-details-username">
            @{friendData.username}
          </div>
          <div id="user-profile-details-join">
            Joined on {convertTime(friendData.date)}
          </div>
          <div>
            {profileData.friendCount}
          </div>
        </div>
      </div>) :
        (<div id="user-profile-load">
          <Ring color="#6614b8" size={30} speed={2} bgOpacity={0.2} />
        </div>)
    }
  </div>
}