import { useState, useEffect } from "react"

export default function PostContainer({loginData}){
  const [discover, setDiscover] = useState(null);

  useEffect(()=>{
    const getDiscoverPost = async () =>{
      const res = await fetch("http://localhost:8080/api/discover",{
        method: 'GET',
        headers:{
          offset: 20
        }
      });
      const data = await res.json();
      console.log(data);
    }
    getDiscoverPost();
  },[loginData])

  return <div>

  </div>
}