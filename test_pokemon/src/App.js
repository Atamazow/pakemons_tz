import Authorization from "./pages/Authorization";
import Home from "./pages/Home";
import {  Route, Routes, NavLink } from "react-router-dom";


function App() {

  return (
    <div
      className="App"
      style={{ width: 1140, margin: "auto", textAlign: "center" }}
    >

      <NavLink to="/">Главная страница </NavLink>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" element={ <Authorization />} />
      </Routes>
    </div>
  );
}

export default App;
