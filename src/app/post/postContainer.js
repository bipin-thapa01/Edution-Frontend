import { useState, useEffect } from "react";
import { CiStar } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import Image from "next/image";
import "./postContainer.css"

export default function PostContainer({ loginData }) {
  const [discover, setDiscover] = useState(null);

  useEffect(() => {
    const getDiscoverPost = async () => {
      const res = await fetch("http://localhost:8080/api/discover", {
        method: 'GET',
        headers: {
          offset: 0
        }
      });
      const data = await res.json();
      if (data.response === 'success') {
        setDiscover(data.posts);
        console.log(data.posts)
      }
    }
    getDiscoverPost();
  }, [loginData]);

  const convertTime = (date) => {
    const prev = new Date(date);
    const now = new Date();
    const diff = now - prev;
    if (diff / (1000 * 60 * 60 * 24 * 30 * 12) >= 1) {
      return ` ${Math.floor(diff / (1000 * 60 * 60 * 24 * 30 * 12))} y`;
    }
    else if (diff / (1000 * 60 * 60 * 24 * 30) >= 1) {
      return ` ${Math.floor(diff / (1000 * 60 * 60 * 24 * 30))} m`;
    }
    else if (diff / (1000 * 60 * 60 * 24) >= 1) {
      return ` ${Math.floor(diff / (1000 * 60 * 60 * 24))} d`;
    }
    else if (diff / (1000 * 60 * 60) >= 1) {
      return ` ${Math.floor(diff / (1000 * 60 * 60))} hr`;
    }
    else if (diff / (1000 * 60) >= 1) {
      return ` ${Math.floor(diff / (1000 * 60))} min`;
    }
    else {
      return ` ${Math.floor(diff / (1000))} sec`;
    }
  }

  return <div id="post-results">
    {
      discover ? discover.map((item, index) => {
        return <div key={index} className="post-result-container">
          <div className="post-result-container-heading">
            <Image src={item.profileUrl} width={100} height={100} alt="logo" className="post-owner-pfp" />
            <div>
              <div className="post-result-username-container">
                <div className="post-result-username">@{item.by}</div>
                <div className="post-result-created-at">.  {convertTime(item.createdAt)}</div>
              </div>
              <div>{item.description}</div>
            </div>
          </div>
          {
            discover.imgurl === "" || discover.imgurl === null ? null : <Image className="post-result-image" src={item.imgurl} width={100} height={100} alt="logo" />
          }
          <div className="post-result-stat">
            <div className="star-container">
              <CiStar />
              <div>{item.star}</div>
            </div>
            <div className="save-container">
              <CiBookmark />
              <div>{item.save}</div>
            </div>
          </div>
        </div>
      }) : null
    }
  </div>
}