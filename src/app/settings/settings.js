import React, { useEffect, useState, useRef } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import PostImage from "../postImage/postImage";
import { Ring } from "ldrs/react";
import "ldrs/react/Ring.css";
import Toast from "../toast/Toast";

export default function Settings({ fetchData }) {
  const textData = useRef();
  const textAreaData = useRef();
  const password = useRef();
  const [show, setShow] = useState(false); //for toast
  const [showMessage, setShowMessage] = useState(false);
  const type = ['name', 'username', 'pfp', 'bio', 'bg'];
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [inputPlaceholder, setInputPlaceholder] = useState("Loading....");
  const [imageList, setImageList] = useState([]);

  const data = [
    { title: "Change Name", description: "Enter your new name" },
    { title: "Change Username", description: "Enter your new username" },
    { title: "Change Profile Picture", description: "Upload new profile picture" },
    { title: "Change Bio", description: "Enter your new bio" },
    { title: "Change Background Image", description: "Upload new background image" },
  ];

  const selectImage = (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setImageList([file]);
  };

  useEffect(() => {
    if (fetchData?.user) {
      setInputPlaceholder(fetchData.user.bio);
      setSelectedIndex(0);
    }
  }, [fetchData]);

  const renderRightContent = () => {
    if (selectedIndex === null) {
      return (
        <div id="settings-loader">
          <Ring color="#6614b8" size={30} speed={2} bgOpacity={0.2} />
        </div>
      );
    }

    const item = data[selectedIndex];

    const updateData = async () => {
      const passwordData = password.current?.value;
      if (selectedIndex === 0 || selectedIndex === 1 || selectedIndex === 3) {
        const updateData = selectedIndex !== 3 ?  textData.current?.value : textAreaData.current?.value;
        const res = await fetch('http://localhost:8080/api/update-text', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: fetchData?.user?.email,
            updateData: updateData,
            type: type[selectedIndex],
            password: passwordData,
          })
        });
        const data = await res.json();
        if(data.response === 'valid'){
          setShow(true);
          setShowMessage("Updated successfully!");
        }
        else{
          setShow(true);
          setShowMessage("Updated unsuccessful!");
        }
      }
      else {
        const formData = new FormData();
        formData.append('file', imageList[0]);
        formData.append('upload_preset', 'edution_users_upload');
        const imageRes = await fetch(`https://api.cloudinary.com/v1_1/dlpm6yyad/image/upload`, {
          method: 'POST',
          body: formData,
        })
        const imageData = await imageRes.json();
        const updateData = imageData.secure_url;
        const res = await fetch('http://localhost:8080/api/update-text', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: fetchData?.user?.email,
            updateData: updateData,
            type: type[selectedIndex],
            password: passwordData,
          })
        });
        const data = await res.json();
        if(data.response === 'valid'){
          setShow(true);
          setShowMessage("Updated successfully!");
        }
        else{
          setShow(true);
          setShowMessage("Updated unsuccessful!");
        }
      }
    }

    return (
      <>
        <div id="settings-right-container-header">{item.title}</div>

        <div id="settings-right-container-change">
          <div>{item.description}</div>

          {selectedIndex === 2 || selectedIndex === 4 ? (
            <input type="file" accept="image/*" onChange={selectImage} />
          ) : selectedIndex === 3 ? (
            <textarea
              id="settings-right-container-textarea"
              defaultValue={inputPlaceholder}
              ref={textAreaData}
            />
          ) : (
            <input
              id="settings-right-container-input"
              type="text"
              autoComplete="off"
              placeholder={item.description}
              ref={textData}
            />
          )}
        </div>

        <div id="settings-right-container-password">
          <div>Enter your current password:</div>
          <input
            id="settings-right-container-password-input"
            type="password"
            autoComplete="off"
            placeholder="Enter your current password"
            ref={password}
          />
        </div>

        {(selectedIndex === 2 || selectedIndex === 4) && (
          <PostImage imageList={imageList} />
        )}

        <button id="settings-page-server-update-button" onClick={updateData}>Update</button>
        <Toast message={showMessage} show={show} onClose={()=>setShow(false)}/>
      </>
    );
  };

  return (
    <div id="settings-container">
      <div id="settings-left-container">
        <div id="settings-left-container-header">Settings</div>

        <div id="settings-left-container-options">
          {data.map((item, index) => (
            <div
              key={index}
              className={`settings-left-container-option ${selectedIndex === index ? "selected-option" : ""
                }`}
              onClick={() => {
                setSelectedIndex(index);
                setImageList([]);
              }}
            >
              <div>{item.title}</div>
              <div>
                <MdKeyboardArrowRight />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div id="settings-right-container">{renderRightContent()}</div>
    </div>
  );
}
