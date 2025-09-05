"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./homePage.css";
import Nav from "./nav/nav";
import Home from "./home";
import RightContainer from "./right/rightContainer";

export default function HomePage() {
  const router = useRouter();
  const [loginCredentials, setLoginCredentials] = useState(null);
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
        setLoginCredentials(data);
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
      {
        loginCredentials && loginCredentials.response === 'valid' ? (<>
          <Nav loginCredentials={loginCredentials.user}/>
          <Home loginCredentials={loginCredentials.user}/>
          <RightContainer loginCredentials={loginCredentials.user}/>
        </>) : (<>
          {router.push('/login')}
          </>)
      }
    </div>
  );
}
