import { Route, Routes } from "react-router-dom";
import Home from "./view/Home";
import Login from "./view/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
