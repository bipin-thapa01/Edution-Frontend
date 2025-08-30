import Image from "next/image";
import { FaUserPlus } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { TbMessage } from "react-icons/tb";

export default function RightNav({ user }) {
  return <div id="homepage-right-nav">
    <div>
      <FaUserPlus />
      <FaRegBell />
      <MdOutlineEmail />
      <TbMessage />
      <Image src={user.imgurl} alt="logo" width={100} height={100}/>
    </div>
  </div>
}