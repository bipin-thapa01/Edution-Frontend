import React, { use } from "react";
import Profile from "./Profile";

export default function User({params}){
  const {username} = React.use(params);
  
  return <Profile username={username}/>
}