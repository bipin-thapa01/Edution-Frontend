import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Ring } from 'ldrs/react'
import 'ldrs/react/Ring.css'
import { FaStar } from "react-icons/fa6";
import './notification.css';

export default function Notification({ notifications }) {
  const [displayNotifications, setDisplayNotifications] = useState(null);
  const [starColor, setStarColor] = useState('white');
  const all = useRef(null);
  const posts = useRef(null);
  const friend = useRef(null);

  useEffect(() => {
    if (notifications) {
      setDisplayNotifications(notifications.notifications);
    }
  }, [notifications]);

  const dynamicStarColor = (item) => {
    if(item.type === 'PRO'){
      setStarColor('blue');
    }
    else if(item.type === 'LEGEND'){
    setStarColor('#6614b8');
    }
    else{
      setStarColor('yellow;')
    }
  }

  const convertTime = (date) => {
    const prev = new Date(date);
    const now = new Date();
    const diff = now - prev;
    if (diff / (1000 * 60 * 60 * 24 * 30 * 12) >= 1) {
      return `${Math.floor(diff / (1000 * 60 * 60 * 24 * 30 * 12))} y`;
    }
    else if (diff / (1000 * 60 * 60 * 24 * 30) >= 1) {
      return `${Math.floor(diff / (1000 * 60 * 60 * 24 * 30))} m`;
    }
    else if (diff / (1000 * 60 * 60 * 24) >= 1) {
      return `${Math.floor(diff / (1000 * 60 * 60 * 24))} d`;
    }
    else if (diff / (1000 * 60 * 60) >= 1) {
      return `${Math.floor(diff / (1000 * 60 * 60))} hr`;
    }
    else if (diff / (1000 * 60) >= 1) {
      return `${Math.floor(diff / (1000 * 60))} min`;
    }
    else {
      return `${Math.floor(diff / (1000))} sec`;
    }
  }

  const filterAll = (e) => {
    all.current.classList.add('filter-selected');
    posts.current.classList.remove('filter-selected');
    friend.current.classList.remove('filter-selected');
    all.current.style.setProperty('--after-all', 'block');
    posts.current.style.setProperty('--after-post', 'none');
    friend.current.style.setProperty('--after-friend', 'none');
    setDisplayNotifications(notifications.notifications);
  }

  const filterPosts = (e) => {
    all.current.classList.remove('filter-selected');
    posts.current.classList.add('filter-selected');
    friend.current.classList.remove('filter-selected');
    all.current.style.setProperty('--after-all', 'none');
    posts.current.style.setProperty('--after-post', 'block');
    friend.current.style.setProperty('--after-friend', 'none');
    setDisplayNotifications(notifications.notifications.filter((item, index) => {
      return item.type === 'post';
    }))
  }

  const filterFriend = (e) => {
    all.current.classList.remove('filter-selected');
    posts.current.classList.remove('filter-selected');
    friend.current.classList.add('filter-selected');
    all.current.style.setProperty('--after-all', 'none');
    posts.current.style.setProperty('--after-post', 'none');
    friend.current.style.setProperty('--after-friend', 'block');
    setDisplayNotifications(notifications.notifications.filter((item, index) => {
      return item.type === 'friend request';
    }))
  }

  const acceptRequest = async (e, index) => {
    e.currentTarget.innerHTML = 'Accepting..';
    const res = await fetch('http://localhost:8080/api/friend-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        response: 'accepted',
        username: notifications.userDTO.username,
        source: notifications.notifications[index].source
      })
    });
    const data = await res.json();
    console.log(data)
    if (data.response == 'success') {
      document.getElementById(`buttons-${index}`).style.display = 'none';
      console.log(document.getElementById(`request-accepted-${index}`))
      document.getElementById(`request-accepted-${index}`).style.display = 'block';
    }

  }

  const declineRequest = async (e, index) => {
    e.currentTarget.innerHTML = 'Declining..';
    const res = await fetch('http://localhost:8080/api/friend-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        response: 'declined',
        username: notifications.userDTO.username,
        source: notifications.notifications[index].source
      })
    });
    const data = await res.json();
    if (data.response == 'success') {
      document.getElementById(`buttons-${index}`).style.display = 'none';
      document.getElementById(`request-declined-${index}`).style.display = 'block';
    }
  }

  return <div id="notification-container" className="middle-container">
    <div id="notification-container-title">Notifications</div>
    <div id='notification-filter-container'>
      <div ref={all} onClick={filterAll} id='notification-filter-all' className='notification-filter filter-selected'>All</div>
      <div ref={posts} onClick={filterPosts} id='notification-filter-post' className='notification-filter'>Posts</div>
      <div ref={friend} onClick={filterFriend} id='notification-filter-friend' className='notification-filter'>Friend</div>
    </div>
    <div>
      {
        !displayNotifications ? <div id='notification-loading-container'> <Ring color="#6614b8" size={30} speed={2} bgOpacity={0.2} /> </div> : displayNotifications.length === 0 ? <div id='no-notification'>No notification yet</div> :
          displayNotifications.map((item, index) => {
            return <div className='notification-card' key={index}>
              <Image className='notification-logo' src={item.imgurl} width={100} height={100} alt='logo' />
              <div className='notification-card-details-container'>
                <div>{item.description}</div>
                <div className='notification-by'>
                  <div>By: {item.source}</div>
                  <div className='notification-star'>
                    {item.type !== 'BASIC' ? <FaStar fill={item.type === 'PRO' ? 'blue' : item.type === 'LEGEND' ? '#6614b8' : 'gold'} /> 
                    : null}</div></div>
                {
                  item.type === 'friend request' && item.status === 'pending' ? <div id={`buttons-${index}`} className='notification-request-buttons'>
                    <button onClick={(e) => acceptRequest(e, index)} className='notification-button-accept'>Accept</button>
                    <button onClick={(e) => declineRequest(e, index)} className='notification-button-decline'>Decline</button>
                  </div> : null
                }
                <div className='notification-friend-request-status' id={`request-accepted-${index}`}>Accepted</div>
                <div className='notification-friend-request-status' id={`request-declined-${index}`}>Declined</div>
              </div>
              <div className='notification-time'>{convertTime(item.date)}</div>
            </div>
          })
      }
    </div>
  </div>
}