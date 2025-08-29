"use client";

import { useRouter } from "next/navigation";
import { RiMenu3Fill } from "react-icons/ri";
import { FaLaptop } from "react-icons/fa";
import { FaImage } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";
import { LuUserRound } from "react-icons/lu";
import { MdOutlineMail } from "react-icons/md";
import { TiGroupOutline } from "react-icons/ti";
import "./authenticateCard.css";

export default function AuthenticateCard({ data }) {
  const router = useRouter();

  return (
    <div>
      <div id="auth-nav">
        <div id="auth-nav-logo">EDUTION</div>
        <div id="auth-nav-func">
          <div onClick={()=>{router.push(data.altLink)}}>
            {data.alt}
          </div>
          <RiMenu3Fill id="auth-nav-burger" fill="#7F24DD" />
        </div>
      </div>

      <div id="auth-card">
        <div id="auth-purple-card" className="auth-card-child">
          <div id="auth-purple-card-title">Join EDUCTION</div>
          <div id="auth-purple-card-desc">Learn, Connect, and Grow - All in One Place</div>
          <div id="auth-purple-card-info">
            <div className="auth-purple-card-info-inner">
              <div className="auth-purple-card-info-inner-icon-container"><FaLaptop className="auth-purple-card-info-inner-icon" /></div>
              <div className="auth-purple-card-info-inner-text-container">
                <div className="auth-purple-card-info-inner-text-title">Community</div>
                <div className="auth-purple-card-info-inner-text-desc">Expose yourself to EDUCTION community.</div>
              </div>
            </div>
            <div className="auth-purple-card-info-inner">
              <div className="auth-purple-card-info-inner-icon-container"><FaImage className="auth-purple-card-info-inner-icon" /></div>
              <div>
                <div className="auth-purple-card-info-inner-text-title">Sharing</div>
                <div className="auth-purple-card-info-inner-text-desc">Share what you recently learned.</div>
              </div>
            </div>
            <div className="auth-purple-card-info-inner">
              <div className="auth-purple-card-info-inner-icon-container"><FiMessageSquare className="auth-purple-card-info-inner-icon" /></div>
              <div>
                <div className="auth-purple-card-info-inner-text-title">Communicate</div>
                <div className="auth-purple-card-info-inner-text-desc">Network with like minded paris.</div>
              </div>
            </div>
          </div>
        </div>
        <div id="auth-white-card" className="auth-card-child">
          <div id="auth-white-card-logo">EDUCTION</div>
          <div className="center">{data.ask}</div>
          <div id="jlmp" className="center">Join Like Minded Pairs</div>
          <form id="auth-form">
            {
              data.type === 'signup' ? (
                <>
                  <div className="auth-input-container">
                    <LuUserRound className="auth-input-container-logo"/>
                    <input autoComplete="off" type="text" placeholder="Enter your name" className="input" />
                  </div>
                </>
              ) : null
            }
            <div className="auth-input-container">
              <MdOutlineMail className="auth-input-container-logo"/>
              <input autoComplete="off" type="text" placeholder="Enter your email" className="input" />
            </div>
            <div className="auth-input-container">
              <LuUserRound className="auth-input-container-logo"/>
              <input autoComplete="off" type="password" placeholder="Enter your password" className="input" />
            </div>
            {
              data.type === 'signup' ? (
                <>
                  <div className="auth-input-container">
                    <TiGroupOutline className="auth-input-container-logo"/>
                    <input autoComplete="off" type="password" placeholder="Enter college room code" className="input" />
                  </div>
                </>
              ) : null
            }
            <button id="auth-form-submit-button">{data.buttonText}</button>
            <div id="auth-alt-option" onClick={()=>{router.push(data.altLink)}}>{data.altOption}</div>
          </form>
        </div>
      </div>
    </div>
  );
}