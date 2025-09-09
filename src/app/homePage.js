"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./homePage.css";
import Nav from "./nav/nav";
import Home from "./home";
import RightContainer from "./right/rightContainer";

export default function HomePage() {
  const router = useRouter();
  const [fetchData, setFetchData] = useState(null);

  useEffect(() => {
    const fetchHomepage = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/home", {
          method: "GET",
          headers: {
            authorization: `${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        console.log(data)
        setFetchData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchHomepage();
  }, []);

  useEffect(() => {
    if (fetchData?.response === "invalid") {
      router.push("/login");
    }
  }, [fetchData, router]);

  return (
    <div id="homepage">
      <Nav loginCredentials={fetchData} />
      <Home loginCredentials={fetchData} />
      <RightContainer loginCredentials={fetchData} />
    </div>
  );
}
