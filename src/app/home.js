import { useState, useEffect } from "react";
import Image from 'next/image';
import { Ring } from 'ldrs/react';
import { CiImageOn } from "react-icons/ci";
import { BsEmojiNeutral } from "react-icons/bs";
import 'ldrs/react/Ring.css';

export default function Home({ loginCredentials }) {
  const [loginData, setLoginData] = useState(null);
  const [imageList, setImageList] = useState([]);
  useEffect(() => {
    if (loginCredentials) {
      setLoginData(loginCredentials.userDTO);
    }
  }, [loginCredentials]);

  const clickInputImage = () => {
    document.getElementById('post-input-file').click();
  }

  const selectImage = (e) => {
    const files = Array.from(e.target.files);
    setImageList((prev) => [...prev, ...files]);
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
      <div id="post-extra-options">
        <CiImageOn id="post-image-option" fill="#6614b8" onClick={clickInputImage}/>
        <input id="post-input-file" type="file" accept="image/*" multiple onClick={selectImage}/>
        <BsEmojiNeutral id="post-emoji-option" fill="#6614b8" />
        <button id="post-button">Post</button>
      </div>
    </div>
  </div>
}