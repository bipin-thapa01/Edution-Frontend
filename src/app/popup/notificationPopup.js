import { useState, useEffect } from "react";

export default function NotificationPopup({feedData, notificationPopup}){
  return <div id="notification-popup" ref={notificationPopup}>
    Notification popup
  </div>
}