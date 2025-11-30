import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";
import Image from "next/image";
import { Ring } from "ldrs/react";
import "ldrs/react/Ring.css";
import { FaLocationArrow } from "react-icons/fa";

export default function Message({ fetchData }) {
  const router = useRouter();
  const textareaRef = useRef();
  const [friends, setFriends] = useState(null);
  const [message, setMessage] = useState(null);
  const [currentFriend, setCurrentFriend] = useState(null);

  useEffect(() => {
    if (fetchData) {
      setFriends(fetchData?.friends);
    }
  }, [fetchData]);

  const displayRightContainer = async (item, index) => {
    const { data, error } = await supabase
      .from("message")
      .select("*")
      .or(`and(to.eq.${fetchData?.user?.username},by.eq.${item?.username}),and(to.eq.${item?.username},by.eq.${fetchData?.user?.username})`);

    if (error) {
      console.error(error);
      return;
    }

    console.log(data)

    setCurrentFriend(item);
    setMessage(data);
  }

  const convertTime = (date) => {
    const joined = new Date(date);
    const monthYear = joined.toLocaleString("en-US", {
      month: "short",
      year: "numeric"
    });
    return monthYear;
  }

  const handleInput = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  const displayMessages = (message, currentFriend) => {
    return <>
      <div id="message-right-container-header">
        {currentFriend.name}
      </div>
      <div onClick={() => router.push(`/user/${currentFriend.username}`)} id="message-right-container-description">
        <div id="message-right-container-description-image">
          <Image alt="image" src={currentFriend.imgurl} fill style={{ objectFit: 'fit' }} />
        </div>
        <div id="message-right-container-description-description">
          <div>{currentFriend.name}</div>
          <div id="message-right-container-description-description-username">@{currentFriend.username}</div>
          <div>Joined on {convertTime(currentFriend.date)}</div>
        </div>
      </div>
      {
        message && message.length > 0 ?
          message.map((item, index) => {

          })
          : <div id="message-right-container-empty-message">Empty message history.<br></br>Say Hi👋</div>
      }
      <div id="message-right-container-input-container">
        <div id="message-right-container-input-container-container">
          <textarea ref={textareaRef} id="message-right-container-input" placeholder="Enter your message" autoComplete="off" onInput={handleInput} />
          <div id="message-right-container-submit">
            <FaLocationArrow fill="#6614b8" />
          </div>
        </div>
      </div>
    </>
  }

  return <div id="messages-container">
    <div id="message-left-container">
      <div id="message-left-container-header">Message</div>
      <div id="message-left-container-options">
        {
          friends ? friends.map((item, index) => {
            return <div className="message-left-container-option" key={index} onClick={() => displayRightContainer(item, index)}>
              <div className="message-left-container-option-image">
                <Image alt="image" src={item.imgurl} fill unoptimized style={{ objectFit: 'fit' }} />
              </div>
              <div>
                <div className="message-left-container-option-details">
                  <div>{item.name} . </div>
                  <div className="message-left-container-option-username"> @{item.username}</div>
                </div>
                <div>
                </div>
              </div>
            </div>
          }) : <div>
            <Ring color="#6614b8" size={30} speed={2} bgOpacity={0.2} />
          </div>
        }
      </div>
    </div>
    <div id="message-right-container">
      {
        message ? displayMessages(message, currentFriend) : <div>
          <Ring color="#6614b8" size={30} speed={2} bgOpacity={0.2} />
        </div>
      }
    </div>
  </div>
}