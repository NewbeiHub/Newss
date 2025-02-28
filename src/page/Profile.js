import "./News.css";
import axios from "axios";
import React, { useState, useEffect } from "react";

function News() {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/db");
        setNewsList(response.data);
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
      }
    };

    fetchNews();
  }, []);
  return (
    <div className="news-container">
      <header className="news-header">
        <h2 className="news-title">ข่าวใหม่</h2>
      </header>

      {newsList.length > 0 ? (
        newsList.map((news, index) => (
          <div key={index}>
      <div className="news-content">
        {/* ชื่อคนโพสต์และหมวดหมู่ */}
        <div className="news-left-top">
          <p><strong>ชื่อคนโพสต์:</strong> อชิตพล</p>
          <p><strong>หมวดหมู่:</strong>{news.news_type || "ไม่มีหมวดหมู่"}</p>
        </div>

        {/* ชื่อข่าว */}
        <div className="news-right-top">
          <h3>{news.news_name}</h3>
        </div>

        {/* รูปภาพ */}
        <div className="news-left-bottom">
          {news.news_img ? (
                  <img
                    src={`http://localhost:3001//api/db/${news.news_img}`}
                    alt="ข่าว"
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-32 h-32 bg-gray-300 flex items-center justify-center rounded-lg">
                    ไม่มีรูปภาพ
                  </div>
                )}
        </div>

        {/* รายละเอียดข่าว */}
        <div className="news-right-bottom">
          <p><strong>วันเวลาโพสต์:</strong>{news.news_date_start}</p>
          <p><strong>วันเวลาหมดอายุ:</strong>{news.news_date_end}</p>
          <p><strong>รายละเอียด:</strong>{news.news_detail}</p>
          <p><strong>อ้างอิง:</strong><a href={news.news_url} target="_blank" rel="noopener noreferrer">อ่านเพิ่มเติม</a></p>
        </div>
      </div>
      </div>
              ))
            ) : (
              <p className="text-center text-gray-500">❌ ไม่มีข่าว</p>
            )}
    </div>
  );
}

export default News;