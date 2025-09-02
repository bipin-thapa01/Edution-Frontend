import Image from "next/image";
import { FaRegBell, FaUserPlus } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";
import { TbMessage } from "react-icons/tb";

export default function RightNav({ feedData }) {
  const imgurl = feedData && feedData.user ? feedData.user.imgurl : '/user.jpg';

  let whoClicked;
  const managePopup = (e) =>{
    const popup = document.getElementById('right-nav-popup');
    // if(whoClicked===e.curretTarget){
    //   const popupChild = document.getElementById('profile-popup');
    // }
    if(popup.style.display === 'block'){
      popup.style.display = 'none';
    }
    else{
      popup.style.display = 'block';
    }
    whoClicked = e.curretTarget;
  }

  return <div id="homepage-right-nav">
    <div id="right-nav-search-container">
      <IoMdSearch id="right-nav-search-icon" />
      <input type="text" placeholder="search EDUCTION" autoComplete="off" id="right-nav-search" />
    </div>
    <div id="right-nav-options">
      <div className="right-nav-opt" onClick={managePopup}><FaUserPlus /></div>
      <div className="right-nav-opt" onClick={managePopup}><FaRegBell /></div>
      <div className="right-nav-opt" onClick={managePopup}><TbMessage /></div>
      <Image src={imgurl} alt="logo" width={100} height={100} id="right-nav-image" onClick={managePopup}/>
    </div>
  </div>
}