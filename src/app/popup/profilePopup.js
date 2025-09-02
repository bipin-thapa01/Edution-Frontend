import Image from "next/image";
import { IoMdSettings } from "react-icons/io";
import { FaCircleQuestion } from "react-icons/fa6";
import { MdQuestionAnswer } from "react-icons/md";
import { MdOutlineLogout } from "react-icons/md";

export default function ProfilePopup({ feedData }) {
  return <div id="profile-popup">
    {
      feedData && feedData.user ? (
        <>
          <div className="profile-popup-child temp-color profile-popup-main" >
            <Image src={feedData.user.imgurl} alt={`icon`} width={100} height={100} id="profile-popup-logo" />
            <div id="profile-popup-username">{feedData.user.name}</div>
          </div>
          <div className="profile-popup-child temp-color">
            <IoMdSettings />
            <div>Settings</div></div>
          <div className="profile-popup-child temp-color">
            <FaCircleQuestion />
            <div>About Me</div></div>
          <div className="profile-popup-child temp-color">
            <MdQuestionAnswer />
            <div>Reach Me</div></div>
          <div className="profile-popup-child temp-color">
            <MdOutlineLogout />
            <div>Log Out</div></div>
        </>
      ) : (null)
    }
  </div>
}