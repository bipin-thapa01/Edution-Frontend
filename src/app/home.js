import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from 'next/image';
import PostContainer from "./post/postContainer";
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

  useEffect(() => {
    if (loginCredentials) {
      setLoginData(loginCredentials.user);
    }
  }, [loginCredentials]);

  const clickInputImage = () => {
    document.getElementById('post-input-file').click();
  }

  const uploadPost = async () => {
    const postText = document.getElementById('post-text').value;
    if (imageList.length === 0 && postText === '') {
      alert('Either photo or text is required!');
      return;
    }
    const formData = new FormData();
    formData.append('file', imageList[0]);
    formData.append('upload_preset', 'edution_users_upload');
    const imageRes = await fetch(`https://api.cloudinary.com/v1_1/dlpm6yyad/image/upload`, {
      method: 'POST',
      body: formData,
    })
    const imageData = await imageRes.json();

    const res = await fetch('http://localhost:8080/api/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        by: loginData.username,
        description: postText,
        imgurl: imageData.secure_url,
      })
    })
    const data = res.text();
    console.log(data);
    setImageList([]);
    document.getElementById('post-text').value = '';
  }

  const displayEmoji = () => {
    if (emojiDisplay === true) {
      setEmojiDisplay(false);
    }
    else {
      setEmojiDisplay(true);
    }
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

  return <div id="home" className="middle-container">
    <div id="homepage-filter">
      <div id="home-filter-discovery">Discover</div>
      <div id="home-filter-following">Following</div>
    </div>
    <div id="post-container">
      <div id="post-write-container">
        {
          loginData ? <Image id="post-user-logo" src={loginData.imgurl} width={100} height={100} alt="logo" /> : <div id="post-loading">
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
    <PostContainer loginData={loginData}/>
  </div>
}