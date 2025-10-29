"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Ring } from 'ldrs/react'
import 'ldrs/react/Ring.css'
import Nav from "../nav/nav";
import Notification from "./notification";
import RightContainer from "../right/rightContainer";
import LowerNav from "../lowerNav/lowerNav";

export default function NotificationPage() {
  const router = useRouter();
  const [fetchData, setFetchData] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/user-notification", {
          method: "GET",
          headers: {
            authorization: `${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        console.log(data)
        setFetchData(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, []);

  useEffect(() => {
    if (fetchData?.response === "invalid") {
      router.push("/login");
    }
  }, [fetchData, router]);

  return (
    <div id="notification-page">
      <Nav loginCredentials={fetchData} />
      <Notification notifications={fetchData}/>
      <RightContainer loginCredentials={fetchData} />
      <LowerNav />
    </div>
  );
}
