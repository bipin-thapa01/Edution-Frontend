import RightNav from "./rightNav"

export default function NewsFeed({feedData}){
  return <div id="homepage-right-container">
    <RightNav feedData={feedData}/>
  </div>
}