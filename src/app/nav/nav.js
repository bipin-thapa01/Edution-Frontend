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
  const [profilename, setProfilename] = useState(null);
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
    console.log(lastUrl, profilename)
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
    else if (lastUrl === 'bookmark') {
      allOptions.forEach(option => {
        option.classList.remove('option-selected');
      })
      remember.classList.add('option-selected');
    }
    else if (lastUrl === 'search'){
      allOptions.forEach(option => {
        option.classList.remove('option-selected');
      })
      search.classList.add('option-selected');
    }
    else if(lastUrl === profilename){
      allOptions.forEach(option => {
        option.classList.remove('option-selected');
      })
      profile.classList.add('option-selected');
    }
  }, [profilename]);

  useEffect(() => {
    if (loginCredentials) {
      if (loginCredentials.userDTO) {
        setLoginData(loginCredentials.userDTO);
        setProfilename(loginCredentials.userDTO.username);
      }
      else {
        setLoginData(loginCredentials.user);
        setProfilename(loginCredentials.user.username);
      }
      if ((loginCredentials.user && loginCredentials.user.type === 'PRO') || (loginCredentials.userDTO && loginCredentials.userDTO.type === 'PRO')) {
        setStarColor('blue');
      }
      else if ((loginCredentials.user && loginCredentials.user.type === 'LEGEND') || (loginCredentials.userDTO && loginCredentials.userDTO.type === 'LEGEND')) {
        setStarColor('#6614b8');
      }
      else {
        setStarColor('gold')
      }
    }
  }, [loginCredentials]);

  return <div id="nav">
    <div id="nav-logo">
      Socialz
    </div>
    {
      loginData ? <div id="nav-user-info">
        <Image id="nav-user-image" src={loginData.imgurl} width={100} height={100} alt="user-logo" />
        <div id="nav-user-desc">
          <div id="nav-username-container">
            <div id="nav-user-name">{loginData.name}</div>
            {
              loginData.type !== 'BASIC' ? <FaStar fill={`${starColor}`} /> : null
            }
          </div>
          <div id="nav-user-username">@{loginData.username}</div>
        </div>
      </div> : <div>
        <div id="nav-user-loading">
          <Ring color="#6614b8" size={30} speed={2} bgOpacity={0.2} />
        </div>
        <div id="nav-optional-loading"></div>
      </div>
    }
    <div id="nav-options">
      <div id="home" className="nav-option" onClick={() => router.push('/')}>
        <MdHome className="nav-option-logo" />
        <div className="nav-opt-desc">Homepage</div>
      </div>
      <div id="search" className="nav-option" onClick={()=>router.push('/search')}>
        <IoMdSearch className="nav-option-logo" />
        <div className="nav-opt-desc">Search</div>
      </div>
      <div id="notification" className="nav-option" onClick={() => router.push('/notification')}>
        <FaRegBell className="nav-option-logo" />
        <div className="nav-opt-desc">Notifications</div>
      </div>
      <div id="remember" className="nav-option" onClick={() => router.push('/bookmark')}>
        <FaBookmark className="nav-option-logo" />
        <div className="nav-opt-desc">Remember</div>
      </div>
      <div id="friend" className="nav-option" onClick={()=>router.push('/friends')}>
        <FaUserPlus className="nav-option-logo" />
        <div className="nav-opt-desc">Friends</div>
      </div>
      <div id="zone" className="nav-option">
        <MdGroups2 className="nav-option-logo" />
        <div className="nav-opt-desc">Zone</div>
      </div>
      <div id="message" className="nav-option">
        <TbMessage className="nav-option-logo" />
        <div className="nav-opt-desc">Message</div>
      </div>
      <div id="profile" className="nav-option" onClick={()=>router.push(`/user/${profilename}`)}>
        <IoPerson className="nav-option-logo" />
        <div className="nav-opt-desc">Profile</div>
      </div>
      <div id="settings" className="nav-option">
        <FaGear className="nav-option-logo" />
        <div className="nav-opt-desc">Settings</div>
      </div>
    </div>
  </div>
}