import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Image from 'next/image';
import PostContainer from "./post/postContainer";
import TopRightPopup from "./topRightPopup/topRightPopup";
import { Ring } from 'ldrs/react';
import { CiImageOn } from "react-icons/ci";
import { BsEmojiNeutral } from "react-icons/bs";
import PostImage from "./postImage/postImage";
const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });
import 'ldrs/react/Ring.css';

export default function Home({ loginCredentials }) {
  const [loginData, setLoginData] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [emojiDisplay, setEmojiDisplay] = useState(false);
  const [postType, setPostType] = useState('all');
  const [show, setShow] = useState(true);
  const [popupMessage, setPopupMessage] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (loginCredentials) {
      setLoginData(loginCredentials.user);
    }
  }, [loginCredentials]);

  // Update UI styles when postType changes
  useEffect(() => {
    const discoveryEl = document.getElementById("home-filter-discovery");
    const followingEl = document.getElementById("home-filter-following");
    
    if (discoveryEl && followingEl) {
      if (postType === 'all') {
        discoveryEl.style.setProperty("--after-discovery", "block");
        followingEl.style.setProperty("--after-following", "none");
      } else {
        discoveryEl.style.setProperty("--after-discovery", "none");
        followingEl.style.setProperty("--after-following", "block");
      }
    }
  }, [postType]);

  const clickInputImage = () => {
    document.getElementById('post-input-file').click();
  }

  const uploadPost = async () => {
    const postText = document.getElementById('post-text').value;
    if (imageList.length === 0 && postText === '') {
      setPopupMessage("Either image or text is required!")
      setShow(true);
      return;
    }

    document.getElementById('post-button').innerText = 'Submitting...';

    let imageData = null;

    if (imageList.length > 0) {
      const formData = new FormData();
      formData.append('file', imageList[0]);
      formData.append('upload_preset', 'edution_users_upload');

      const imageRes = await fetch("https://api.cloudinary.com/v1_1/dlpm6yyad/image/upload", {
        method: "POST",
        body: formData,
      });

      imageData = await imageRes.json();
    }

    const res = await fetch("https://myapp-64rs.onrender.com/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        by: loginData.username,
        description: postText,
        imgurl: imageData?.secure_url || "n",
      })
    });

    const data = res.text();
    console.log(data);
    setPopupMessage("Post Uploaded Successfully!")
    setShow(true);
    setImageList([]);
    document.getElementById('post-text').value = '';

    document.getElementById('post-button').innerText = 'Submitted✅';

    const res2 = await fetch("https://myapp-64rs.onrender.com/api/home", {
      method: "GET",
      headers: {
        authorization: `${localStorage.getItem("token")}`,
      },
    });
    const data2 = await res2.json();
    setLoginData(data2?.user);

    setTimeout(() => {
      document.getElementById('post-button').innerText = 'Post';
    }, 2000);
  }

  const displayEmoji = () => {
    setEmojiDisplay(!emojiDisplay);
  }

  const onEmojiClick = (emoji) => {
    document.getElementById('post-text').value = document.getElementById('post-text').value + emoji.emoji;
  }

  const selectImage = (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setImageList([file]);
    e.target.value = null;
  };

  const filterPost = (e) => {
    const type = e.currentTarget.textContent;
    if (type === 'Discover') {
      setPostType('all');
    } else {
      setPostType('following');
    }
  }

  return <div id="home-container" className="middle-container">
    {
      popupMessage ? <TopRightPopup
        message={popupMessage}
        duration={10000}
        show={show}
        onClose={() => setShow(false)}
      /> : null
    }
    <div id="homepage-filter">
      <div id="home-filter-discovery" onClick={filterPost}>Discover</div>
      <div id="home-filter-following" onClick={filterPost}>Following</div>
    </div>
    <div id="post-container">
      <div id="post-write-container">
        {
          loginData ? <div onClick={()=>router.push(`/user/${loginData?.username}`)} id="homepage-post-upload-imgurl">
            <Image id="post-user-logo" src={loginData.imgurl} fill style={{objectFit: 'cover'}} alt="logo" />
          </div> : <div id="post-loading">
            <Ring color="#6614b8" size={30} speed={2} bgOpacity={0.2} />
          </div>
        }
        <textarea id="post-text" placeholder="Something to share?" />
      </div>
      <PostImage imageList={imageList} />
      <div id="post-extra-options">
        <CiImageOn id="post-image-option" fill="#6614b8" onClick={clickInputImage} />
        <input id="post-input-file" type="file" accept="image/*" multiple onChange={selectImage} />
        <BsEmojiNeutral id="post-emoji-option" fill="#6614b8" onClick={displayEmoji} />
        <button id="post-button" onClick={uploadPost}>Post</button>
      </div>
    </div>
    <EmojiPicker onEmojiClick={onEmojiClick} open={emojiDisplay} width={320} height={400} skinTonesDisabled={true}
      reactionsDefaultOpen={false}
      style={{
        position: "absolute",
        top: "200px",
        left: "360px",
        zIndex: 1000,
      }}
    />
    <PostContainer loginData={loginData} postType={postType} />
  </div>
}