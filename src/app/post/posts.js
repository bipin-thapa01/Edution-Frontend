import { useRouter } from "next/navigation";
import { FaBookmark } from "react-icons/fa6";
import { GrPowerCycle } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { Ring } from 'ldrs/react';
import Image from "next/image";
import "./postContainer.css"

export default function Posts({post}) {
  const router = useRouter();
  const convertTime = (date) => {
    const prev = new Date(date);
    const now = new Date();
    const diff = now - prev;
    if (diff / (1000 * 60 * 60 * 24 * 30 * 12) >= 1) {
      return ` ${Math.floor(diff / (1000 * 60 * 60 * 24 * 30 * 12))} yrs`;
    }
    else if (diff / (1000 * 60 * 60 * 24 * 30) >= 1) {
      return ` ${Math.floor(diff / (1000 * 60 * 60 * 24 * 30))} mon`;
    }
    else if (diff / (1000 * 60 * 60 * 24) >= 1) {
      return ` ${Math.floor(diff / (1000 * 60 * 60 * 24))} days`;
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

  const bookmarkPost = async (bookmarkType, postId, userId) => {
    let res = await fetch("http://localhost:8080/api/check-bookmark", {
      method: 'GET',
      headers: {
        userId: `${userId}`,
        bookmarkId: `${postId}`,
      }
    });
    let data = await res.json();
    if (data.response === 'exist') {
      document.getElementById(`bookmark-container${postId}`).style.pointerEvents = 'none';
      document.getElementById(`bookmark${postId}`).style.fill = '#b2b2b2';
      let bookmarkCount = document.getElementById(`bookmark-count${postId}`);
      bookmarkCount.innerText = parseInt(bookmarkCount.innerText) - 1;
      setTimeout(() => {
        document.getElementById(`bookmark-container${postId}`).style.pointerEvents = 'auto';
      }, 5000);
      let res1 = await fetch("http://localhost:8080/api/bookmark", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookmark: `${bookmarkType}`,
          bookmarkId: `${postId}`,
          userId: `${userId}`,
          update: false,
        })
      });
      let data1 = await res1.json();
    }
    else {
      document.getElementById(`bookmark-container${postId}`).style.pointerEvents = 'none';
      document.getElementById(`bookmark${postId}`).style.fill = '#6614b8';
      let bookmarkCount = document.getElementById(`bookmark-count${postId}`);
      bookmarkCount.innerText = parseInt(bookmarkCount.innerText) + 1;
      setTimeout(() => {
        document.getElementById(`bookmark-container${postId}`).style.pointerEvents = 'auto';
      }, 5000);
      let res2 = await fetch("http://localhost:8080/api/bookmark", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookmark: `${bookmarkType}`,
          bookmarkId: `${postId}`,
          userId: `${userId}`,
          update: true,
        })
      });
      let data2 = await res2.json();
    }
  }

  return <div id="post-results">
    {
      post ? post.length>0 ? post.map((item, index) => {
        return <div key={index} className="post-result-container">
          <div className="post-result-container-heading" onClick={()=>router.push(`/user/${item.by}`)}>
            <Image src={item.profileUrl} width={100} height={100} alt="logo" className="post-owner-pfp" />
            <div>
              <div className="post-result-username-container">
                <div className="post-result-username" onClick={()=>router.push(`/user/${item.by}`)}>@{item.by}</div>
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
              <FaHeart className="heart" id={`react${item.postId}`} fill={item.isStarred ? '#6614b8' : '#b2b2b2'} />
              <div id={`star-count${item.postId}`}>{item.star}</div>
            </div>
            <div id={`bookmark-container${item.postId}`} className="save-container" onClick={() => { bookmarkPost('post', item.postId, item.userId) }}>
              <FaBookmark id={`bookmark${item.postId}`} fill={item.isBookmarked ? '#6614b8' : '#b2b2b2'} />
              <div id={`bookmark-count${item.postId}`}>{item.save}</div>
            </div>
            <div className="repost-container">
              <GrPowerCycle />
              <div>{item.repostCount}</div>
            </div>
          </div>
        </div>
      }) : <div id="post-not-found">No Post Found</div> : <div id="post-loader">
        <Ring color="#6614b8" size={30} speed={2} bgOpacity={0.2} />
      </div>
    }
  </div>
}