import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Posts from "../post/posts";
import { FaSearch } from "react-icons/fa";
import LatestUsers from "./LatestUsers";
import Image from "next/image";
import { Ring } from 'ldrs/react';

export default function Search({ fetchData }) {
  const router = useRouter();
  const [searchStatus, setSearchStatus] = useState(<div>Search</div>);
  const [data, setData] = useState(null);
  const [searchType, setSearchType] = useState('user');
  const [searchContent, setSearchContent] = useState(null);

  useEffect(() => {
    if (!fetchData) return;
    setData(fetchData.userDTOs);
  }, [fetchData]);

  const searchKey = async (e) => {
    setSearchStatus(<Ring color="#6614b8" size={30} speed={2} bgOpacity={0.2} />);
    let key = e.currentTarget.value;
    if (key.length === 0) {
      setSearchContent(null);
      setSearchStatus(<div>Search</div>);
      return;
    }
    let res = await fetch("https://myapp-64rs.onrender.com/api/search", {
      method: 'GET',
      headers: {
        key: `${key}`,
        username: `${fetchData.userDTO.username}`,
      }
    });
    let data = await res.json();
    setSearchContent(data);
  }

  const changeSearchResultType = (e) => {
    let type = e.currentTarget.innerText;
    if (type === 'Users') {
      document.getElementById('search-type-user').style.setProperty('--after-search-user', 'block');
      document.getElementById('search-type-post').style.setProperty('--after-search-post', 'none');
      setSearchType('user');
    }
    else {
      document.getElementById('search-type-user').style.setProperty('--after-search-user', 'none');
      document.getElementById('search-type-post').style.setProperty('--after-search-post', 'block');
      setSearchType('post');
    }
  }

  return (
    <div className="middle-container">
      <div id="search-container">
        <FaSearch />
        <input id="search-keyword" type="text" placeholder="Search" autoComplete="off" onChange={searchKey} />
      </div>
      <div id="latest-user-container">
        <div id="latest-user-title">
          New Users
        </div>
        <div>
          <LatestUsers data={data}/>
        </div>
      </div>
      <div id="search-result-container">
        <div id="search-result-type">
          <div id="search-type-user" onClick={changeSearchResultType}>Users</div>
          <div id="search-type-post" onClick={changeSearchResultType}>Posts</div>
        </div>
        <div id="search-results">
          {
            searchContent ? (
              searchType === 'user' ? (
                searchContent.userDTOs?.length > 0 ? (
                  searchContent.userDTOs.map((item, index) => (
                    <div className="search-result-user" key={index} onClick={() => router.push(`/user/${item.username}`)}>
                      <div id="search-result-profile">
                        <Image src={item.imgurl} alt="userImage" fill unoptimized style={{ objectFit: 'cover' }} />
                      </div>
                      <div className="id-details">
                        <div>{item.name}</div>
                        <div className="id-username">@{item.username}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div id="search-result-default">No result</div>
                )
              ) : (
                searchContent.postDTOs?.length > 0 ? (
                  <Posts post={searchContent.postDTOs} />
                ) : (
                  <div id="search-result-default">No result</div>
                )
              )
            ) : (
              <div id="search-result-default">{searchStatus}</div>
            )
          }
        </div>
      </div>
    </div>
  );
}