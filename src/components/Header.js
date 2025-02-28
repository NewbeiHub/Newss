import React from "react";
import "./Header.css";
function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <img src="/settings-icon.png" alt="Settings" className="icon" />
        <h1>สารสนเทศและข่าวสารสาขา</h1>
      </div>
      <div className="header-right">
        <span>65100XXXXX อชิตพล</span>
        <img
          src="/profile-icon.png"
          alt="Profile"
          className="profile-icon"
        />
      </div>
    </header>
  );
}

export default Header;