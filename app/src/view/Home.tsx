import { useEffect } from "react";
import Avatar from "../components/Avatar";
import Header from "../components/Header";
import NotesList from "../components/NotesList";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { RootState } from "../lib/store";
import { user } from "../lib/features/auth/authActions";

export default function Home() {
  const { userInfo, status } = useAppSelector((state: RootState) => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(user());
  }, []);

  return (
    <div className="flex">
      <Header />
      <main className="p-10 w-full">
        <div className="flex mb-10 justify-end">
          <Avatar
            status={status}
            img={userInfo?.picture}
            size={48}
            name={userInfo?.fullname}
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Notes</h1>
        </div>
        <div className="pt-10">
          <NotesList />
        </div>
      </main>
    </div>
  );
}
