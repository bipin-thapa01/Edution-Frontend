import { useRef } from "react";
import ProfilePopupContainer from "./popup/profilePopupContainer";
import RightNav from "./rightNav";

export default function NewsFeed({ feedData }) {

  let friendRequestPopup = useRef(null);
  let notificationPopup = useRef(null);
  let messagePopup = useRef(null);
  let profilePopup = useRef(null);

  const managePopupInnerDisplay = (e) => {
    if (!friendRequestPopup.current || !notificationPopup.current || !messagePopup.current || !profilePopup.current) {
      return;
    }

    if (e.currentTarget.id === 'right-nav-friend-requests') {
      friendRequestPopup.current.style.display = 'flex';
      notificationPopup.current.style.display = 'none';
      messagePopup.current.style.display = 'none';
      profilePopup.current.style.display = 'none';
    }
    else if (e.currentTarget.id === 'right-nav-notification') {
      friendRequestPopup.current.style.display = 'none';
      notificationPopup.current.style.display = 'flex';
      messagePopup.current.style.display = 'none';
      profilePopup.current.style.display = 'none';
    }
    else if (e.currentTarget.id === 'right-nav-message') {
      friendRequestPopup.current.style.display = 'none';
      notificationPopup.current.style.display = 'none';
      messagePopup.current.style.display = 'flex';
      profilePopup.current.style.display = 'none';
    }
    else {
      friendRequestPopup.current.style.display = 'none';
      notificationPopup.current.style.display = 'none';
      messagePopup.current.style.display = 'none';
      profilePopup.current.style.display = 'flex';
    }
  }

  let whoClicked;
  const managePopup = (e) => {
    const popup = document.getElementById('right-nav-popup');
    if (whoClicked === e.currentTarget) {
      if (popup.style.display === 'block') {
        popup.style.display = 'none';
      }
      else {
        popup.style.display = 'block';
        managePopupInnerDisplay(e);
      }
    } else {
      popup.style.display = 'block';
      managePopupInnerDisplay(e);
    }
    whoClicked = e.currentTarget;
  }

  return <div id="homepage-right-container">
    <RightNav feedData={feedData} managePopup={managePopup} />
    <ProfilePopupContainer feedData={feedData} friendRequestPopup={friendRequestPopup} notificationPopup={notificationPopup} messagePopup={messagePopup} profilePopup={profilePopup} />
  </div>
}