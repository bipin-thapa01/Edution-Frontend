import "./lowerNav.css";
import { useRouter } from "next/navigation";
import { MdHome } from "react-icons/md";
import { FaRegBell } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { TbMessage } from "react-icons/tb";
import { RxHamburgerMenu } from "react-icons/rx";

export default function LowerNav({lowerNav}){
  const router = useRouter();
  return (
    <div id="lower-nav-container" ref={lowerNav}>
      <MdHome className="lower-nav-option" onClick={()=>router.push('/')}/>
      <IoMdSearch onClick={()=>router.push('/search')} className="lower-nav-option"/>
      <FaRegBell onClick={()=>router.push('/notification')} className="lower-nav-option"/>
      <TbMessage onClick={()=>router.push('/messages')} className="lower-nav-option"/>
    </div>
  );
}