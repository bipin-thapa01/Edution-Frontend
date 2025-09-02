import ProfilePopup from "./profilePopup";
import FriendRequestPopup from "./friendRequestPopup";
import "./profilePopup.css";

export default function ProfilePopupContainer({feedData}){
  return <div id="right-nav-popup">
    <ProfilePopup feedData={feedData}/>
    <FriendRequestPopup feedData={feedData}/>
  </div>
}