import Avatar from "../components/Avatar";
import Header from "../components/Header";
import NotesList from "../components/NotesList";
import { useAppSelector } from "../lib/hooks";
import { RootState } from "../lib/store";

export default function Home() {
  const { userInfo, status } = useAppSelector((state: RootState) => state.auth);

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
