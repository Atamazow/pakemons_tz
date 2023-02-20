import { Route, Routes } from "react-router-dom";
import Authorization from "./pages/Authorization/Authorization";
import Home from "./pages/Home/Home";
import './index.css'

function App() {
  return (
    <div
      className="App"
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Authorization />} />
      </Routes>
    </div>
  );
}


export default App;
