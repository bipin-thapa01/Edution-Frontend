"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Nav from "./Nav";
import NewsFeed from "./newsFeed";
import "./homePage.css";

export default function HomePage() {
  const router = useRouter();
  const [feedData, setFeedData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('http://localhost:8080/api/home', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await res.json();
        console.log('Feed data:', data);
        setFeedData(data);
      } catch (err) {
        console.error('Error fetching feed:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div id="homepage">
      <Nav feedData={feedData} />
      <NewsFeed feedData={feedData}/>
    </div>
  );
}
