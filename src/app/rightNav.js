import Image from "next/image";
import { FaUserPlus } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { TbMessage } from "react-icons/tb";
import { IoMdSearch } from "react-icons/io";

export default function RightNav({ feedData }) {
  const imgurl = feedData.user ? feedData.user.imgurl : '/user.jpg';
  return <div id="homepage-right-nav">
    <div id="right-nav-search-container">
      <IoMdSearch id="right-nav-search-icon"/>
      <input type="text" placeholder="search EDUCTION" autoComplete="off" id="right-nav-search"/>
    </div>
    <div id="right-nav-options">
      <div className="right-nav-opt"><FaUserPlus /></div>
      <div className="right-nav-opt"><FaRegBell /></div>
      <div className="right-nav-opt"><MdOutlineEmail /></div>
      <div className="right-nav-opt"><TbMessage /></div>
      <Image src={imgurl} alt="logo" width={100} height={100} id="right-nav-image"/>
    </div>
  </div>
}