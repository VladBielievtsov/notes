import Header from "../components/Header";
import NotesList from "../components/NotesList";

export default function Home() {
  return (
    <div className="flex">
      <Header />
      <main className="p-10 w-full">
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
