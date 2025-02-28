import React from "react";
import "./Onews.css";

function Onews() {
  return (
    <div className="onews-container">
      <header className="onews-header">
        <h2 className="onews-title">ข่าวเก่า</h2>
      </header>

      <div className="onews-content">
        {/* ชื่อคนโพสต์และหมวดหมู่ */}
        <div className="onews-left-top">
          <p><strong>ชื่อคนโพสต์:</strong> อชิตพล</p>
          <p><strong>หมวดหมู่:</strong> กิจกรรม</p>
        </div>

        {/* ชื่อข่าว */}
        <div className="onews-right-top">
          <h3>กิจกรรมต้อนรับนักศึกษาใหม่</h3>
        </div>

        {/* รูปภาพ */}
        <div className="onews-left-bottom">
          <div className="image-placeholder">รูปภาพ</div>
        </div>

        {/* รายละเอียดข่าว */}
        <div className="onews-right-bottom">
          <p><strong>วันเวลาโพสต์:</strong> 01/10/20xx</p>
          <p><strong>วันเวลาหมดอายุ:</strong> 15/10/20xx</p>
          <p><strong>รายละเอียด:</strong> กิจกรรมนี้จัดขึ้นเพื่อ...</p>
          <p><strong>อ้างอิง:</strong> จากเว็บไซต์...</p>
        </div>
      </div>
    </div>
  );
}

export default Onews;