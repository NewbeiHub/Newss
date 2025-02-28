import { useNavigate } from "react-router-dom"; // ใช้สำหรับการนำทาง
import "./Home.css";

import React, { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Home() {
  const navigate = useNavigate(); // ฟังก์ชันสำหรับการเปลี่ยนหน้า

  const handleNewsClick = (path) => {
    navigate(path); // เปลี่ยนเส้นทางไปที่ path ที่กำหนด
  };
  // const handleNewsClick = (path) => {
  //   navigate(`path/${news_id}`); 
  // };

  const handleAddNews = () => {
    navigate("/form"); // เปลี่ยนเส้นทางไปที่ "/form"
  };

  useEffect(() => {
    fetchProfileId();
  }, []);

    const {news_id } = useParams();
    const [profileid, setProfileId] = useState([]);
    const [loading, setLoading] = useState(true);

  const fetchProfileId = () => {
    axios
      .get(`http://localhost:3001/api/db`)
      .then((response) => {
        setProfileId(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    
    <div className="home-container">

      {/* ข่าวใหม่ */}
      <div className="news-section">
        <h2 className="new-news-title">ข่าวใหม่</h2>

        {profileid.map((profileid) => (

        <div className="news-list">
          <button
            // key={profileid.news_id}
            className="news-button"
            onClick={() => handleNewsClick(`news/${news_id}`)}
          >
            <p>{profileid.news_name}</p>
          </button>
        </div>

        ))}

      </div>

      {/* ข่าวเก่า */}
      <div className="news-section">
        <h2 className="old-news-title">ข่าวเก่า</h2>
        <div className="news-list">

          <button
            className="news-button"
            onClick={() => handleNewsClick("/onews")}
          >
            ยกคลาส
          </button>
          <button
            className="news-button"
            onClick={() => handleNewsClick("/onews")}
          >
            การประชุมสาขา
          </button>

        </div>
      </div>

      {/* ปุ่มเพิ่มข่าวใหม่ */}
      <div className="add-news-button-wrapper">
        <button className="add-news-button" onClick={handleAddNews}>
          เพิ่มข่าวใหม่
        </button>
      </div>
    </div>
  );
}

export default Home;
