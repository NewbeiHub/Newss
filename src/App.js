import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

// นำเข้าไฟล์คอมโพเนนต์และเพจ
import Header from "./components/Header";
import Home from "./page/Home";
import Onews from "./page/Onews";
import Form from "./page/Form";
import News from "./page/News";
import Profile from "./page/Profile";
import ProfileId from "./page/ProfileId";
import About from "./page/About";

function App() {
  return (
    <Router>
      <Header />
      <nav>
        <ul>
          <Link to="/about">About</Link>/<Link to="/">Home</Link>/
          <Link to="/news">News</Link>/<Link to="/onews">Onews</Link>/
          <Link to="/form">Form</Link>/<Link to="/profile">Profile</Link>/
          <Link to="/profileId">ProfileId</Link>/
        </ul>
      </nav>
      <Routes>
        <Route path="/about/:news_id" element={<About />} />
        <Route path="/" element={<Home />} />
        <Route path="/onews" element={<Onews />} />
        <Route path="/form" element={<Form />} />
        <Route path="/news" element={<News />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profileId" element={<ProfileId />} />
      </Routes>
    </Router>
  );
}

export default App;
