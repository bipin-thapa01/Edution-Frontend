import { useState, useEffect } from "react";
import Posts from "./posts";

export default function PostContainer({ loginData, postType }) {
  const [post, setPost] = useState(null);

  const getDiscoverPost = async () => {
    const res = await fetch("https://myapp-t7qu.onrender.com/api/discover", {
      method: 'GET',
      headers: {
        offset: 0,
        username: loginData.username,
      }
    });
    const data = await res.json();
    if (data.response === 'success') {
      setPost(data.posts);
      console.log(data);
    }
  }

  const getFollowingPost = async () => {
    const res = await fetch("https://myapp-t7qu.onrender.com/api/following", {
      method: 'GET',
      headers: {
        offset: 0,
        username: loginData.username,
      }
    });
    const data = await res.json();
    if (data.response === 'success') {
      setPost(data.posts);
    }
  }

  useEffect(() => {
    if (!loginData) return;
    if (postType === 'all') {
      setPost(null);
      getDiscoverPost();
    }
    else {
      setPost(null);
      getFollowingPost();
    }
  }, [loginData, postType])

  return <Posts post={post}/>
}