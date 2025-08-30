import RightNav from "./rightNav"

export default function NewsFeed({feedData}){
  return <div id="homepage-right-container">
    <RightNav user={feedData.user}/>
  </div>
}