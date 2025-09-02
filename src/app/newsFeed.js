import ProfilePopupContainer from "./popup/profilePopupContainer";
import RightNav from "./rightNav";

export default function NewsFeed({ feedData }) {
  return <div id="homepage-right-container">
    <RightNav feedData={feedData} />
    {
      feedData && feedData.user ? (<ProfilePopupContainer feedData={feedData} />) : (null)
    }
  </div>
}