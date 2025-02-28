import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Form.css";

function Form() {
  const navigate = useNavigate();
  const [postDate, setPostDate] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [seList, setSeList] = useState([]);
  const [formData, setFormData] = useState({
    news_name: "",
    news_type: "ประชุม",
    news_date_start: "",
    news_date_end: "",
    news_detail: "",
    news_url: "",
  });

  // อัปเดต state เมื่อผู้ใช้กรอกข้อมูล
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTextareaChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      news_detail: e.target.value,
    }));
  };

  // จัดการเลือกรูปภาพ
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // ลบรูปภาพที่เลือก
  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  // เพิ่ม SE ใหม่
  const handleAddSE = () => {
    const number = prompt("กรุณาใส่ตัวเลขสำหรับ SE:");
    if (number !== null && !isNaN(number)) {
      setSeList((prev) => [...prev, `SE #${number}`]);
    } else {
      alert("กรุณาใส่ตัวเลขที่ถูกต้อง");
    }
  };

  // ลบ SE ออกจากรายการ
  const handleRemoveSE = (se) => {
    setSeList((prev) => prev.filter((item) => item !== se));
  };

  // ส่งข้อมูลไปยังเซิร์ฟเวอร์
  const handlePost = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("news_name", formData.news_name);
      formDataToSend.append("news_type", formData.news_type);
      formDataToSend.append("news_date_start", formData.news_date_start);
      formDataToSend.append("news_date_end", formData.news_date_end);
      formDataToSend.append("news_detail", formData.news_detail);
      formDataToSend.append("news_url", formData.news_url);
      formDataToSend.append("seList", JSON.stringify(seList));
      if (selectedImage) {
        formDataToSend.append("news_img", selectedImage);
      }

      const response = await axios.post("http://localhost:3001/api/db", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        alert("โพสต์เสร็จสิ้น");
        navigate("/");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการโพสต์ข่าว:", error);
      alert("เกิดข้อผิดพลาดในการโพสต์ข่าว");
    }
  };

  // เปลี่ยนหน้าไปที่ Home เมื่อกดปุ่ม Cancel
  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="form-container">
      {/* ช่องใส่ชื่อข่าว */}
      <input
        type="text"
        name="news_name"
        placeholder="ชื่อข่าว"
        className="input-title"
        value={formData.news_name}
        onChange={handleInputChange}
      />

      {/* กลุ่มวันที่ */}
      <div className="date-group">
        <label className="date-label1">
          วันโพสต์:
          <input
            type="date"
            name="news_date_start"
            className="date-picker"
            value={formData.news_date_start}
            onChange={handleInputChange}
          />
        </label>

        <label className="date-label2">
          วันหมดอายุ:
          <input
            type="date"
            name="news_date_end"
            className="date-picker"
            value={formData.news_date_end}
            onChange={handleInputChange}
          />
        </label>
      </div>

      {/* กลุ่มปุ่ม */}
      <div className="button-group">
        <select
          name="news_type"
          className="dropdown"
          value={formData.news_type}
          onChange={handleInputChange}
        >
          <option value="ประชุม">ประชุม</option>
          <option value="กิจกรรม">กิจกรรม</option>
        </select>

        {seList.map((se, index) => (
          <button
            key={index}
            className="blue-button selected"
            onClick={() => handleRemoveSE(se)}
          >
            {se}
          </button>
        ))}

        <button className="blue-button" onClick={handleAddSE}>
          Add SE
        </button>
      </div>

      {/* Textarea สำหรับรายละเอียดข่าว */}
      <textarea
        name="news_detail"
        placeholder="รายละเอียด........................."
        className="textarea"
        value={formData.news_detail}
        onChange={handleTextareaChange}
      ></textarea>

      {/* กลุ่มรูปภาพ */}
      <div className="image-group">
        <label className="image-button">
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" className="image-preview" />
          ) : (
            "+ image"
          )}
        </label>

        {selectedImage && (
          <button className="remove-image-button" onClick={handleRemoveImage}>
            ลบรูป
          </button>
        )}

        <input
          type="text"
          name="news_url"
          placeholder="Link URL"
          className="input-link"
          value={formData.news_url}
          onChange={handleInputChange}
        />
      </div>

      {/* กลุ่มปุ่ม Action */}
      <div className="action-group">
        <button className="cancel-button" onClick={handleCancel}>
          Cancel
        </button>
        <button className="post-button" onClick={handlePost}>
          Post
        </button>
      </div>
    </div>
  );
}

export default Form;