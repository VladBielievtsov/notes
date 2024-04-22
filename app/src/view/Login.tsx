import { motion } from "framer-motion";
import googleLogo from "../assets/google.svg";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../lib/hooks";
import { RootState } from "../lib/store";

export default function Login() {
  const { userInfo, status } = useAppSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "succeeded") {
      if (userInfo !== null) navigate("/");
    }
  }, [userInfo, status]);

  const handleClick = async () => {
    window.location.href = `${import.meta.env.VITE_API}/api/auth/google`;
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <motion.a
        onClick={handleClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        href={"#"}
        className="flex items-center space-x-2 border border-lavender shadow-md px-2.5 py-2 rounded-xl"
      >
        <img src={googleLogo} alt="google logo" className="w-6" />
        <span>Login with Google</span>
      </motion.a>
    </div>
  );
}
