"use client";

import { useRouter } from "next/navigation";
import { RiMenu3Fill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { FaLaptop } from "react-icons/fa";
import { FaImage } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";
import { LuUserRound } from "react-icons/lu";
import { MdOutlineMail } from "react-icons/md";
import { TiGroupOutline } from "react-icons/ti";
import { FaKey } from "react-icons/fa";
import "./authenticateCard.css";

export default function AuthenticateCard({ data, submitForm }) {
  const router = useRouter();

  return (
    <div>
      <div id="auth-nav">
        <div id="auth-nav-logo">EDUTION</div>
        <div id="auth-nav-func">
          <div onClick={() => { router.push(data.altLink) }}>
            {data.alt}
          </div>
          <RiMenu3Fill id="auth-nav-burger" fill="#7F24DD" />
        </div>
      </div>

      <div id="auth-card">
        <div id="auth-purple-card" className="auth-card-child">
          <div id="auth-purple-card-title">Join EDUTION</div>
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
          <div id="auth-white-card-logo">EDUTION</div>
          <div className="center">{data.ask}</div>
          <div id="jlmp" className="center">Join Like Minded Pairs</div>
          <form id="auth-form" onSubmit={submitForm}>
            {
              data.type === 'signup' ? (
                <>
                  <div className="auth-input-container">
                    <LuUserRound className="auth-input-container-logo" />
                    <input autoComplete="off" type="text" placeholder="Enter your name" className="input" id="name" />
                  </div>
                  <div className="auth-input-container">
                    <FaUser className="auth-input-container-logo" />
                    <input autoComplete="off" type="text" placeholder="Enter your username" className="input" id="username" />
                  </div>
                </>
              ) : null
            }
            <div className="auth-input-container">
              <MdOutlineMail className="auth-input-container-logo" />
              <input autoComplete="off" type="text" placeholder="Enter your email" className="input" id=
                'email' />
            </div>
            <div className="auth-input-container">
              <FaKey className="auth-input-container-logo" />
              <input autoComplete="off" type="password" placeholder="Enter your password" className="input" id="password" />
            </div>
            {
              data.type === 'signup' ? (
                <>
                  <div className="auth-input-container">
                    <TiGroupOutline className="auth-input-container-logo" />
                    <input autoComplete="off" type="password" placeholder="Enter college room code" className="input" id="room-code" />
                  </div>
                </>
              ) : null
            }
            <button id="auth-form-submit-button">{data.buttonText}</button>
            <div id="auth-alt-option" onClick={() => { router.push(data.altLink) }}>{data.altOption}</div>
          </form>
        </div>
      </div>
    </div>
  );
}