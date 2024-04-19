import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../lib/hooks";
import { RootState } from "../lib/store";

export default function Layout() {
  const { userInfo, status } = useAppSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "failed") {
      if (userInfo === null) navigate("/login");
    }
  }, [userInfo, status]);

  return (
    userInfo !== null && (
      <>
        <Outlet />
      </>
    )
  );
}
