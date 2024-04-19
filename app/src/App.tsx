import { Route, Routes } from "react-router-dom";
import Home from "./view/Home";
import Login from "./view/Login";
import Layout from "./components/Layout";
import { useEffect } from "react";
import { user } from "./lib/features/auth/authActions";
import { useAppDispatch } from "./lib/hooks";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(user());
  }, []);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
