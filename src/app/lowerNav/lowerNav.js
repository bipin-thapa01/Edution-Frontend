import "./lowerNav.css";
import { useRouter } from "next/navigation";
import { MdHome } from "react-icons/md";
import { FaRegBell } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { TbMessage } from "react-icons/tb";

export default function LowerNav(){
  const router = useRouter();
  return (
    <div id="lower-nav-container">
      <MdHome className="lower-nav-option" onClick={()=>router.push('/')}/>
      <IoMdSearch className="lower-nav-option"/>
      <div id="lower-add-post" className="lower-nav-option">+</div>
      <FaRegBell className="lower-nav-option"/>
      <TbMessage className="lower-nav-option"/>
    </div>
  );
}