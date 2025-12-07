import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";
import Image from "next/image";
import { Ring } from "ldrs/react";
import "ldrs/react/Ring.css";
import { FaLocationArrow } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

export default function Message({ fetchData }) {
  const router = useRouter();
  const textareaRef = useRef();
  const bottomRef = useRef();
  const leftContainer = useRef();
  const rightContainer = useRef();
  const latestMessageRef = useRef(null);
  const [friends, setFriends] = useState(null);
  const [message, setMessage] = useState(null);
  const [currentFriend, setCurrentFriend] = useState(null);
  const intervalIds = useRef([]);


  useEffect(() => {
    if (fetchData) {
      setFriends(fetchData?.friends);
    }
  }, [fetchData]);

  useEffect(() => {
    latestMessageRef.current = message;
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message])

  const displayRightContainer = async (item, index, e) => {
    if(leftContainer.current !== undefined && rightContainer.current !== undefined){
      leftContainer.current.style.display = 'none';
      rightContainer.current.style.display = 'flex';
    }
    intervalIds.current.forEach(id => clearInterval(id));
    intervalIds.current = [];
    const { data, error } = await supabase
      .from("message")
      .select("*")
      .or(`and(to.eq.${fetchData?.user?.username},by.eq.${item?.username}),and(to.eq.${item?.username},by.eq.${fetchData?.user?.username})`);

    if (error) {
      console.error(error);
      return;
    }

    setCurrentFriend(item);
    if (JSON.stringify(data) !== JSON.stringify(message)) {
      setMessage(data);
    }


    const id = setInterval(async () => {
      const { data, error } = await supabase
        .from("message")
        .select("*")
        .or(`and(to.eq.${fetchData?.user?.username},by.eq.${item?.username}),and(to.eq.${item?.username},by.eq.${fetchData?.user?.username})`);

      if (error) {
        console.error(error);
        return;
      }

      setCurrentFriend(item);
      if (JSON.stringify(data) !== JSON.stringify(latestMessageRef.current)) {
        setMessage(data);
      }

    }, [1000]);
    intervalIds.current.push(id);
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

  const uploadMessage = async () => {
    if (textareaRef.current !== undefined) {
      const newMessage = textareaRef.current.value;
      if (newMessage !== '') {
        const now = new Date();
        const updatedMessage = {
          id: message[message.length - 1].id + 1,
          content: newMessage,
          by: fetchData?.user?.username,
          to: currentFriend?.username,
          created_at: now
        }
        setMessage([...message, updatedMessage]);
        const { data, error } = await supabase.from("message").insert(updatedMessage);
        if (error) {
          console.error(error);
          return;
        }
        textareaRef.current.value = '';
      }
    }
  }

  const handleEnter = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      uploadMessage();
    }
  };

  const goBack = () =>{
    if(leftContainer.current !== undefined && rightContainer.current !== undefined){
      leftContainer.current.style.display = 'block';
      rightContainer.current.style.display = 'none';
    }
  }


  const displayMessages = (message, currentFriend) => {
    return <>
      <div id="message-right-container-header">
      <div id="message-right-container-go-back">
      <FaArrowLeft onClick={goBack}/></div> {currentFriend.name}
      </div>
      <div id="message-right-container-body">
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
        <div id="message-right-container-message-container">
          {
            message && message.length > 0 ?
              message.map((item, index) => {
                return <div className={`message-right-container-message ${item.by === currentFriend?.username ? "left" : "right"}`} id={`message-right-container-message${index}`} key={index}>
                  {item.content}
                </div>
              })
              : <div id="message-right-container-empty-message">Empty message history.<br></br>Say Hi👋</div>
          }
        </div>
        <div ref={bottomRef}></div>
        <div id="message-right-container-bottom-spacer"></div>
      </div>
      <div id="message-right-container-input-container">
        <div id="message-right-container-input-container-container">
          <textarea onKeyDown={handleEnter} ref={textareaRef} id="message-right-container-input" placeholder="Enter your message" autoComplete="off" onInput={handleInput} />
          <div id="message-right-container-submit" onClick={uploadMessage}>
            <FaLocationArrow fill="#6614b8" />
          </div>
        </div>
      </div>
    </>
  }

  return <div id="messages-container">
    <div id="message-left-container" ref={leftContainer}>
      <div id="message-left-container-header">Message</div>
      <div id="message-left-container-options">
        {
          friends ? friends.map((item, index) => {
            return <div className="message-left-container-option" key={index} onClick={(e) => displayRightContainer(item, index, e)}>
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
    <div id="message-right-container" ref={rightContainer}>
      {
        message ? displayMessages(message, currentFriend) : <div>
          <Ring color="#6614b8" size={30} speed={2} bgOpacity={0.2} />
        </div>
      }
    </div>
  </div>
}