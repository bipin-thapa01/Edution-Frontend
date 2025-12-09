import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './navbar.module.css';

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const closeNav = () => {
    setIsOpen(false);
  };

  const navClass = isOpen 
    ? `${styles.floatingNav} ${styles.floatingNavVisible}` 
    : styles.floatingNav;

  const buttonClass = isOpen 
    ? `${styles.navToggleBtn} ${styles.navToggleBtnActive}` 
    : styles.navToggleBtn;

  return (
    <>
      <button 
        className={buttonClass} 
        onClick={toggleNav}
        aria-expanded={isOpen}
        aria-controls="floating-nav-menu"
        title="Toggle Navigation Menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav id="floating-nav-menu" className={navClass}>
        <ul>
          <li><a onClick={()=>{
            closeNav();
            router.push('/bookmark');
          }}>Bookmark</a></li>
          <li><a onClick={()=>{
            closeNav();
            router.push('/friends');
          }}>Friend Requests</a></li>
          <li><a onClick={()=>{
            closeNav();
            router.push('/settings');
          }}>Settings</a></li>
          <li><a onClick={()=>{
            closeNav();
            localStorage.removeItem("token");
            router.push('/login');
          }}>Logout</a></li>
        </ul>
      </nav>
    </>
  );
};