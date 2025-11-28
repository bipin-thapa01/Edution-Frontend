import { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import PostImage from "../postImage/postImage";
import { Ring } from 'ldrs/react';
import 'ldrs/react/Ring.css';

export default function Settings({fetchData}) {
  const [rightContent, setRightContent] = useState(null);
  const [inputPlaceholder, setInputPlaceholder] = useState("Loading....");
  const [imageList, setImageList] = useState([]);
  const data = [{
    title: 'Change Name',
    description: 'Enter your new name',
  },
  {
    title: 'Change Username',
    description: 'Enter your new username',
  },
  {
    title: 'Change Profile Picture',
    description: 'Upload new profile picture',
  },
  {
    title: 'Change Bio',
    description: 'Enter your new bio',
  },
  {
    title: 'Change Background Image',
    description: 'Upload new background image',
  },
  ];

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

  const selectImage = (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setImageList([file]);
    e.target.value = null;
    console.log(imageList)
  };

  useEffect(()=>{
    if(fetchData?.user !== null){
      console.log(fetchData)
      setInputPlaceholder(fetchData?.user?.bio);
      setRightContent(
        <>
          <div id="settings-right-container-header">
            {data[0].title}: 
          </div>
        </>
      );
      document.getElementById(`settings-left-container-option0`).classList.add('selected-option');
    }
  },[fetchData]);

  const displayRightContent = (index) => {
    setRightContent(
      <>
        <div id="settings-right-container-header">
          {data[index].title}
        </div>
        <div id="settings-right-container-change">
          <div>{data[index].description}</div>
          {
            index === 2 || index === 4 ? <input type="file" accept="image/*" onChange={selectImage}/> :  index === 3 ? <textarea id="settings-right-container-textarea" defaultValue={inputPlaceholder}/> : <input id="settings-right-container-input" type="text" autoComplete="off" placeholder={data[index].description}/>
          }
        </div>
        <div id="settings-right-container-password">
          <div>Enter your current password: </div>
          <input id="settings-right-container-password-input" type="password" autoComplete="off" placeholder="Enter your current password"/>
        </div>
        <PostImage imageList={imageList}/>
      </>
    );
    document.querySelectorAll('.settings-left-container-option').forEach(option => {
      option.classList.remove('selected-option');
    });
    document.getElementById(`settings-left-container-option${index}`).classList.add('selected-option');
  }

  return <div id="settings-container">
    <div id="settings-left-container">
      <div id="settings-left-container-header">
        Settings
      </div>
      <div id="settings-left-container-options">
        {
          data.map((item, index) => {
            return <div onClick={() => displayRightContent(index)} key={index} className="settings-left-container-option" id={`settings-left-container-option${index}`}>
              <div>{item.title}</div>
              <div>
                <MdKeyboardArrowRight />
              </div>
            </div>
          })
        }
      </div>
    </div>
    <div id="settings-right-container">
      {rightContent ? rightContent :
        <div id="settings-loader">
          <Ring color="#6614b8" size={30} speed={2} bgOpacity={0.2} />
        </div>}
    </div>
  </div>
}