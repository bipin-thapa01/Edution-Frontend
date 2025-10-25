import { useState, useEffect } from "react";
import { CiBookmark } from "react-icons/ci";
import { BiRepost } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { Ring } from 'ldrs/react';
import Image from "next/image";
import "./postContainer.css"

export default function PostContainer({ loginData, postType }) {
  const [post, setPost] = useState(null);
  let starColor = 'white';

  const getDiscoverPost = async () => {
    const res = await fetch("http://localhost:8080/api/discover", {
      method: 'GET',
      headers: {
        offset: 0,
        username: loginData.username,
      }
    });
    const data = await res.json();
    if (data.response === 'success') {
      setPost(data.posts);
      console.log(data);
    }
  }

  const getFollowingPost = async () => {
    const res = await fetch("http://localhost:8080/api/following", {
      method: 'GET',
      headers: {
        offset: 0,
        username: loginData.username,
      }
    });
    const data = await res.json();
    if (data.response === 'success') {
      setPost(data.posts);
    }
  }
  useEffect(() => {
    if (!loginData) return;
    if (postType === 'all') {
      setPost(null);
      getDiscoverPost();
    }
    else {
      setPost(null);
      getFollowingPost();
    }
  }, [loginData, postType])

  const redefineStarColor = (item) => {
    if (item.type === 'LEGEND') {
      starColor = '#6614b8';
    }
    else {
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

  const likePost = async (isStarred, postId, userId) => {
    let res = await fetch("http://localhost:8080/api/specific-post", {
      method: "GET",
      headers: {
        postId: `${postId}`,
        userId: `${userId}`,
      }
    });
    let data = await res.json();
    if (data.isStarred) {
      document.getElementById(`react${postId}`).style.fill = '#b2b2b2';
      let starCount = document.getElementById(`star-count${postId}`);
      starCount.innerText = parseInt(starCount.innerText) - 1;
      document.getElementById(`star-container${postId}`).style.pointerEvents = 'none';
      setTimeout(() => {
        document.getElementById(`star-container${postId}`).style.pointerEvents = 'auto';
      }, 5000);
      
      let res1 = await fetch("http://localhost:8080/api/unstar", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          postId: `${postId}`,
          userId: `${userId}`
        })
      });
      let data1 = await res1.json();
    }
    else {
      document.getElementById(`react${postId}`).style.fill = '#6614b8';
      let starCount = document.getElementById(`star-count${postId}`);
      starCount.innerText = parseInt(starCount.innerText) + 1;
      document.getElementById(`star-container${postId}`).style.pointerEvents = 'none';
      setTimeout(() => {
        document.getElementById(`star-container${postId}`).style.pointerEvents = 'auto';
      }, 5000);
      
      let res2 = await fetch("http://localhost:8080/api/star", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          postId: `${postId}`,
          userId: `${userId}`
        })
      });
      let data2 = await res2.json();
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
            <div id={`star-container${item.postId}`} className="star-container" onClick={() => likePost(item.isStarred, item.postId, item.userId)}>
              <FaStar id={`react${item.postId}`} fill={item.isStarred ? '#6614b8' : '#b2b2b2'} />
              <div id={`star-count${item.postId}`}>{item.star}</div>
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
      }) : <div id="post-loader">
        <Ring color="#6614b8" size={30} speed={2} bgOpacity={0.2} />
      </div>
    }
  </div>
}