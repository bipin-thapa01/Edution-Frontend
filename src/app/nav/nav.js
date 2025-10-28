import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Ring } from 'ldrs/react'
import 'ldrs/react/Ring.css'
import { MdHome } from "react-icons/md";
import { FaRegBell, FaUserPlus } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";
import { FaBookmark } from "react-icons/fa";
import { MdGroups2 } from "react-icons/md";
import { TbMessage } from "react-icons/tb";
import { IoPerson } from "react-icons/io5";
import { FaGear } from "react-icons/fa6";
import './nav.css';

export default function Nav({ loginCredentials }) {
  const router = useRouter();
  const [loginData, setLoginData] = useState(null);
  const [starColor, setStarColor] = useState('white');
  useEffect(() => {
    const url = window.location.href.split('/');
    const lastUrl = url[url.length - 1]
    const home = document.getElementById('home');
    const search = document.getElementById('search');
    const notification = document.getElementById('notification');
    const remember = document.getElementById('remember');
    const zone = document.getElementById('zone');
    const message = document.getElementById('message');
    const profile = document.getElementById('profile');
    const settings = document.getElementById('settings');
    const allOptions = document.querySelectorAll('.nav-option')
    if (lastUrl === '') {
      allOptions.forEach(option => {
        option.classList.remove('option-selected');
      })
      home.classList.add('option-selected');
    }
    else if (lastUrl === 'notification') {
      allOptions.forEach(option => {
        option.classList.remove('option-selected');
      })
      notification.classList.add('option-selected');
    }
    else if(lastUrl === 'bookmark'){
      allOptions.forEach(option => {
        option.classList.remove('option-selected');
      })
      remember.classList.add('option-selected');
    }
  }, []);

  useEffect(()=>{
    if(loginCredentials){
      if(loginCredentials.userDTO){
        setLoginData(loginCredentials.userDTO);
      }
      else{
        setLoginData(loginCredentials.user);
      }
      if((loginCredentials.user && loginCredentials.user.type === 'PRO') || (loginCredentials.userDTO && loginCredentials.userDTO.type === 'PRO')){
        setStarColor('blue');
      }
      else if((loginCredentials.user && loginCredentials.user.type === 'LEGEND') || (loginCredentials.userDTO && loginCredentials.userDTO.type === 'LEGEND')){
        setStarColor('#6614b8');
      }
      else{
        setStarColor('gold')
      }
    }
  },[loginCredentials]);

  return <div id="nav">
    <div id="nav-logo">
      ED
    </div>
    {
      loginData ? <div id="nav-user-info">
        <Image id="nav-user-image" src={loginData.imgurl} width={100} height={100} alt="user-logo" />
        <div id="nav-user-desc">
          <div id="nav-username-container">
            <div id="nav-user-name">{loginData.name}</div>
            {
              loginData.type !== 'BASIC' ? <FaStar fill={`${starColor}`}/> : null
            }
          </div>
          <div id="nav-user-username">@{loginData.username}</div>
        </div>
      </div> : <div id="nav-user-loading">
        <Ring color="#6614b8" size={30} speed={2} bgOpacity={0.2} />
      </div>
    }
    <div id="nav-options">
      <div id="home" className="nav-option" onClick={() => router.push('/')}>
        <MdHome className="nav-option-logo" />
        <div>Homepage</div>
      </div>
      <div id="search" className="nav-option">
        <IoMdSearch className="nav-option-logo" />
        <div>Search</div>
      </div>
      <div id="notification" className="nav-option" onClick={() => router.push('/notification')}>
        <FaRegBell className="nav-option-logo" />
        <div>Notifications</div>
      </div>
      <div id="remember" className="nav-option" onClick={() => router.push('/bookmark')}>
        <FaBookmark className="nav-option-logo" />
        <div>Remember</div>
      </div>
      <div id="friend" className="nav-option">
        <FaUserPlus className="nav-option-logo" />
        <div>Friends</div>
      </div>
      <div id="zone" className="nav-option">
        <MdGroups2 className="nav-option-logo" />
        <div>Zone</div>
      </div>
      <div id="message" className="nav-option">
        <TbMessage className="nav-option-logo" />
        <div>Message</div>
      </div>
      <div id="profile" className="nav-option">
        <IoPerson className="nav-option-logo" />
        <div>Profile</div>
      </div>
      <div id="settings" className="nav-option">
        <FaGear className="nav-option-logo" />
        <div>Settings</div>
      </div>
      <button id="nav-post">Post</button>
    </div>
  </div>
}