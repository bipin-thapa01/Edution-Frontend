import { useState, useEffect } from "react";
import { IoIosStar } from "react-icons/io";
import Image from "next/image";

export default function NotificationPopup({ feedData, notificationPopup }) {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchNotification = async () => {
      const res = await fetch('http://localhost:8080/api/user-notification',
        {
          method: 'GET',
          headers: {
            email: `${feedData.user.email}`
          }
        });
      const data = await res.json();
      setNotification(data);
      console.log(data);
    }

    if (feedData && feedData?.user) {
      fetchNotification();
    }
  }, []);
  return <div id="notification-popup" ref={notificationPopup}>
    {
      feedData && feedData.user ? (notification ? (
        notification.map((item, index) => {
          return <div key={index} className="notification-card temp-color">
            <Image src={item.imgurl} alt="logo" width={100} height={100} className="notification-user-logo" />
            <div className="notification-container temp-color">
              <div className="notification-description temp-color">{item.description}</div>
              <div id="source-container" className="temp-color">
                <div className="notification-by temp-color">By: {item.source.toUpperCase()}
                </div>
                {item.source === 'admin' ? <IoIosStar fill="#5d1b9e" className="theme-color" /> : null}
              </div>
            </div>
          </div>
        })) : (<div>No notification</div>)) : (<div>Login</div>)
    }
  </div>
}