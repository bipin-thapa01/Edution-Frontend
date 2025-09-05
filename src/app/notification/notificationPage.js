"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Nav from "../nav/nav";
import Notification from "./notification";
import RightContainer from "../right/rightContainer";

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

  if (!fetchData || fetchData.response === "invalid") {
    return <div>EDUTION</div>;
  }

  return (
    <div id="notification-page">
      <Nav loginCredentials={fetchData.userDTO} />
      <Notification notifications={fetchData.notifications}/>
      <RightContainer loginCredentials={fetchData.userDTO} />
    </div>
  );
}
