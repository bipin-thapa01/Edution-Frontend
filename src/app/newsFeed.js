import RightNav from "./rightNav"
import ProfilePopup from "@/popup/profilePopup"

export default function NewsFeed({feedData}){
  return <div id="homepage-right-container">
    <RightNav feedData={feedData}/>
    <ProfilePopup/>
  </div>
}