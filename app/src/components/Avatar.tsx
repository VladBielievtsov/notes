import { useState } from "react";
import { motion } from "framer-motion";
import { useAppDispatch } from "../lib/hooks";
import { logout } from "../lib/features/auth/authActions";
import { useNavigate } from "react-router-dom";

interface AvatarProps {
  img?: string;
  size?: number;
  name?: string;
  status: string;
}

export default function Avatar({ img, size, name, status }: AvatarProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handlerLogout = () => {
    dispatch(logout()).then(() => {
      navigate("/login");
    });
  };

  return (
    <div className="relative">
      <button
        className="flex items-center space-x-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          {status === "succeeded" ? (
            <>
              <strong>Hello. </strong>
              {name}
            </>
          ) : (
            "Loading"
          )}
        </span>
        {status === "succeeded" ? (
          <img
            src={img}
            alt={name}
            className="object-cover rounded-full overflow-hidden"
            style={{ width: size + "px", height: size + "px" }}
          />
        ) : (
          <div
            style={{ width: size + "px", height: size + "px" }}
            className="rounded-full bg-zinc-400"
          />
        )}
      </button>
      <motion.div
        animate={isOpen ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        className="opacity-0 shadow-md min-w-40 border-lavender border rounded-md absolute right-0 origin-top bg-white"
      >
        <ul className="p-1">
          <li>
            <button
              className="w-full text-left px-2 py-1.5 hover:bg-lavender rounded-sm text-sm"
              onClick={handlerLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </motion.div>
    </div>
  );
}
