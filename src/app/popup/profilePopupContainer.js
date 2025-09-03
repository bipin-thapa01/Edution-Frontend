import ProfilePopup from "./profilePopup";
import FriendRequestPopup from "./friendRequestPopup";
import NotificationPopup from "./notificationPopup";
import MessagePopup from "./messagePopup";
import "./profilePopup.css";

export default function ProfilePopupContainer({feedData, friendRequestPopup, notificationPopup, messagePopup, profilePopup}){
  return <div id="right-nav-popup">
    <ProfilePopup feedData={feedData} profilePopup={profilePopup}/>
    <FriendRequestPopup feedData={feedData} friendRequestPopup={friendRequestPopup}/>
    <NotificationPopup feedData={feedData} notificationPopup={notificationPopup}/>
    <MessagePopup feedData={feedData} messagePopup={messagePopup}/>
  </div>
}