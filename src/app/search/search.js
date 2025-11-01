import { useEffect, useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { Ring } from 'ldrs/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import Image from "next/image";

export default function Search({ fetchData }) {

  const [data, setData] = useState(null);
  const friendButton = useRef(null);

  useEffect(() => {
    if (!fetchData) return;

    setData(fetchData.userDTOs);
    console.log(fetchData);
  }, [fetchData]);

  const isFriend = async (username, friendUsername, index) =>{
    const res = await fetch("http://localhost:8080/api/is-friend",{
      method: 'GET',
      headers: {
        username: `${username}`,
        friend: `${friendUsername}`
      }
    });
    const data = await res.json();
    if(data.response === 'friend'){
      friendButton.current.style.backgroundColor = '#2e2e2e';
      return true;
    }
    else{
      friendButton.current.style.backgroundColor = '#6614b8';

      return false;
    }
  }

  const searchKey = async (e, type='user') =>{
    let key = e.currentTarget.value;
    let res = await fetch("http://localhost:8080/api/search", {
    method: 'GET',
    headers: {
      key : `${key}`,
      type: `${type}`
    }
    });
    let data = await res.json();
  }

  return (
    <div className="middle-container">
      <div id="search-container">
        <FaSearch />
        <input id="search-keyword" type="text" placeholder="Search" autoComplete="off" onChange={searchKey}/>
      </div>
      <div id="latest-user-container">
        <div id="latest-user-title">
          New Users
        </div>
        <div>
          <Swiper
            slidesPerView={3}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {
              data ?
                data.map((item, index) => {
                  return <SwiperSlide className="id-container" key={index}>
                    <div className="user-profile">
                      <Image className="profile-image" fill src={item.imgurl} alt="profile url" />
                    </div>
                    <div className="id-details">
                      <div>{item.name}</div>
                      <div className="id-username">@{item.username}</div>
                    </div>
                    <div ref={friendButton} id={`friend-button${index}`} className="friend-button">
                      {
                        isFriend(fetchData.userDTO.username, item.username, index) ? "Friends" : "Send Request"
                      }
                    </div>
                  </SwiperSlide>
                }) : <div className="new-user-loader">
                  <Ring color="#6614b8" size={30} speed={2} bgOpacity={0.2} />
                </div>
            }
            </Swiper>
        </div>
      </div>
      <div id="search-result-container">
        <div id="search-result-type">
          <div>Users</div>
          <div>Posts</div>
        </div>
        {
          "" ? <div>

          </div> : 
          <div id="search-result-result">No result</div>
        }
      </div>
    </div>
  );
}