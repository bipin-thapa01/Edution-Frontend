import Image from "next/image";
import { MdHome } from "react-icons/md";
import { FaRegBell, FaUserPlus } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { FaBookmark } from "react-icons/fa";
import { MdGroups2 } from "react-icons/md";
import { TbMessage } from "react-icons/tb";
import { IoPerson } from "react-icons/io5";
import { FaGear } from "react-icons/fa6";
import './nav.css';

export default function Nav({ loginCredentials }) {
  console.log(loginCredentials)
  return <div id="nav">
    <div id="nav-logo">
      ED
    </div>
    <div id="nav-user-info">
      <Image id="nav-user-image" src={loginCredentials.imgurl} width={100} height={100} alt="user-logo" />
      <div id="nav-user-desc">
        <div id="nav-user-name">{loginCredentials.name}</div>
        <div id="nav-user-username">@{loginCredentials.username}</div>
      </div>
    </div>
    <div id="nav-options">
      <div className="nav-option">
        <MdHome className="nav-option-logo"/>
        <div>Homepage</div>
      </div>
      <div className="nav-option">
        <IoMdSearch className="nav-option-logo"/>
        <div>Search</div>
      </div>
      <div className="nav-option">
        <FaRegBell className="nav-option-logo"/>
        <div>Notifications</div>
      </div>
      <div className="nav-option">
        <FaBookmark className="nav-option-logo"/>
        <div>Remember</div>
      </div>
      <div className="nav-option">
        <MdGroups2 className="nav-option-logo"/>
        <div>Zone</div>
      </div>
      <div className="nav-option">
        <TbMessage className="nav-option-logo"/>
        <div>Message</div>
      </div>
      <div className="nav-option">
        <IoPerson className="nav-option-logo"/>
        <div>Profile</div>
      </div>
      <div className="nav-option">
        <FaGear className="nav-option-logo"/>
        <div>Settings</div>
      </div>
      <button id="nav-post">Post</button>
    </div>
  </div>
}