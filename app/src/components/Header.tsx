import { Link } from "react-router-dom";
import AddNoteBtn from "./AddNoteBtn";

export default function Header() {
  return (
    <header className="min-h-screen border-r border-lavender">
      <div className="p-4">
        <div>
          <Link to={"/"} className="font-bold">
            Notes
          </Link>
        </div>
        <div className="mt-10">
          <AddNoteBtn />
        </div>
      </div>
    </header>
  );
}
