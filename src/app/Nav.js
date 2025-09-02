import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MdOutlineMail } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { BiSolidDashboard } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";

export default function Nav({ feedData }) {
  const [fd, setFd] = useState(null);
  const router = useRouter();
  const [selected, setSelected] = useState('feed');

  useEffect(()=>{
    const arr = window.location.href.split('/');
    const position = arr[arr.length - 1]
    if(position === '') setSelected('feed');
    else if(position === 'people') setSelected('people');
    else if(position === 'rooms') setSelected('rooms');
  },[]);

  useEffect(()=>{
    setFd(feedData);
  },[feedData])

  const submitForm = async (e) => {
    e.preventDefault();
    const temp = e.currentTarget.querySelector('#email').value.trim();
    let email;
    let username;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(emailRegex.test(temp)){
      email = temp;
    }
    else{
      username = temp;
    }
    const password = e.currentTarget.querySelector('#password').value;

    const res = await fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, username: username, password: password })
    });
    const data = await res.json();
    if (data.error) {
      console.log(data.error)
    }
    else {
      localStorage.removeItem('token');
      localStorage.setItem('token', data.token);
      router.push('/');
    }
    location.reload();
  }

  let htmlData;
  if(fd && fd.response === 'valid'){
    htmlData = <div id="left-container-info">
            <Image src={feedData.user.imgurl} width={130} height={130} alt="profile picture" id="left-container-info-image" />
            <div>{feedData.user.name}</div>
            <div id="left-container-info-email">@{feedData.user.username}</div>
          </div>
  }
  else{
    htmlData = <form id="left-container-form" onSubmit={submitForm}>
            <div className="left-container-form-title">Login Now</div>
            <div id="left-nav-input-container-container">
              <div className="left-nav-input-container">
                <MdOutlineMail className="auth-input-container-logo" />
                <input autoComplete="off" type="text" placeholder="Enter your email" className="left-input" id=
                  'email' />
              </div>
              <div className="left-nav-input-container">
                <FaKey className="auth-input-container-logo" />
                <input autoComplete="off" type="password" placeholder="Enter your password" className="left-input" id="password" />
              </div>
              <button id="left-nav-button">Login in</button>
            </div>
          </form>
  }

  return <div id="homepage-left-container">
    <div id="homepage-left-upper-container">
      <div id="homepage-left-upper-container-title">EDUTION</div>
      {htmlData}
    </div>
    <div id="homepage-left-lower-container">
      <div className={`left-container-option ${selected === 'feed' ? 'selected' : ''}`} id="feed">
        <BiSolidDashboard fill="#5d1b9e" className="left-container-option-icon" />
        <div>Feed</div>
      </div>
      <div className={`left-container-option ${selected === 'people' ? 'selected' : ''}`}id="people">
        <FaUser fill="#5d1b9e" className="left-container-option-icon" />
        <div>People</div>
      </div>
      <div className={`left-container-option ${selected === 'rooms' ? 'selected' : ''}`} id="rooms">
        <FaUsers fill="#5d1b9e" className="left-container-option-icon" />
        <div>Rooms</div>
      </div>
    </div>
  </div>
}