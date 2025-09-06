import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Ring } from 'ldrs/react'
import 'ldrs/react/Ring.css'
import { FaStar } from "react-icons/fa6";
import './notification.css';

export default function Notification({ notifications }) {
  const [displayNotifications, setDisplayNotifications] = useState(null);
  const all = useRef(null);
  const posts = useRef(null);
  const friend = useRef(null);

  useEffect(()=>{
    if(notifications){
      setDisplayNotifications(notifications.notifications);
    }
  },[notifications])

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
  }

  const filterPosts = (e) => {
    all.current.classList.remove('filter-selected');
    posts.current.classList.add('filter-selected');
    friend.current.classList.remove('filter-selected');
    all.current.style.setProperty('--after-all', 'none');
    posts.current.style.setProperty('--after-post', 'block');
    friend.current.style.setProperty('--after-friend', 'none');
  }

  const filterFriend = (e) => {
    all.current.classList.remove('filter-selected');
    posts.current.classList.remove('filter-selected');
    friend.current.classList.add('filter-selected');
    all.current.style.setProperty('--after-all', 'none');
    posts.current.style.setProperty('--after-post', 'none');
    friend.current.style.setProperty('--after-friend', 'block');
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
        !displayNotifications ? <div id='notification-loading-container'> <Ring color="#6614b8" size={30} speed={1} bgOpacity={0.2} /> </div> : displayNotifications.length === 0 ? <div id='no-notification'>No notification yet</div> :
        displayNotifications.map((item, index) => {
          return <div className='notification-card' key={index}>
            <Image className='notification-logo' src={item.imgurl} width={100} height={100} alt='logo' />
            <div className='notification-card-details-container'>
              <div>{item.description}</div>
              <div className='notification-by'>
                <div>By: {item.source}</div>
                <div className='notification-star'>{item.source === 'admin' ? <FaStar fill='#6614b8' /> : null}</div></div>
              {
                item.type === 'friend request' && item.status === 'pending' ? <div className='notification-request-buttons'>
                <button className='notification-button-accept'>Accept</button>
                <button className='notification-button-decline'>Decline</button>
              </div> : null
              }
            </div>
            <div className='notification-time'>{convertTime(item.date)}</div>
          </div>
        })
      }
    </div>
  </div>
}