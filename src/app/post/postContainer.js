import { useState, useEffect } from "react";
import { CiStar } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { BiRepost } from "react-icons/bi";
import { FaStar } from "react-icons/fa6";
import Image from "next/image";
import "./postContainer.css"

export default function PostContainer({ loginData, postType }) {
  const [post, setPost] = useState(null);
  let starColor = 'white';

  const getDiscoverPost = async () => {
    const res = await fetch("http://localhost:8080/api/discover", {
      method: 'GET',
      headers: {
        offset: 0
      }
    });
    const data = await res.json();
    if (data.response === 'success') {
      setPost(data.posts);
    }
  }

  const getFollowingPost = async() =>{
    const res = await fetch("http://localhost:8080/api/following", {
      method: 'GET',
      headers: {
        offset: 0,
      }
    });
    const data = await res.json();
    if(data.response === 'success'){
      setPost(data.posts);
    }
  }

  useEffect(() => {
    getDiscoverPost();
  }, [loginData]);

  if(postType === 'all'){
    getDiscoverPost();
  }
  else{
    getFollowingPost();
  }

  const redefineStarColor = (item) =>{
    if(item.type === 'LEGEND'){
      starColor = '#6614b8';
    }
    else{
      starColor = 'gold';
    }
  }

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
      post ? post.map((item, index) => {
        redefineStarColor(item);
        return <div key={index} className="post-result-container">
          <div className="post-result-container-heading">
            <Image src={item.profileUrl} width={100} height={100} alt="logo" className="post-owner-pfp" />
            <div>
              <div className="post-result-username-container">
                <div className="post-result-username">@{item.by}</div>
                {
                  item.type !== 'BASIC' ? <FaStar fill={`${starColor}`} /> : null
                }
                <div className="post-result-created-at">.  {convertTime(item.createdAt)}</div>
              </div>
              <div>{item.description}</div>
            </div>
          </div>
          {
            post.imgurl === "" || post.imgurl === null ? null : <Image className="post-result-image" src={item.imgurl} width={100} height={100} alt="logo" unoptimized />
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
            <div className="repost-container">
              <BiRepost />
              <div>{item.repostCount}</div>
            </div>
          </div>
        </div>
      }) : null
    }
  </div>
}