import { useAppSelector } from "../lib/hooks";
import { RootState } from "../lib/store";
import AddNoteForm from "./AddNoteForm";
import NoteCard from "./NoteCard";

export default function NotesList() {
  const notesList = useAppSelector((state: RootState) => state.notes.list);
  const isFormOpen = useAppSelector(
    (state: RootState) => state.notes.isFormOpen
  );

  return (
    <div
      className="grid gap-10"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(288px, 303px))" }}
    >
      {isFormOpen && <AddNoteForm />}
      {!!notesList.length &&
        notesList.map((note) => (
          <NoteCard
            key={note.id}
            id={note.id}
            color={note.color}
            content={note.content}
            createdAt={note.createdAt}
          />
        ))}
      {notesList.length == 0 && !isFormOpen && (
        <h3 className="font-bold text-lg">No notes yet</h3>
      )}
    </div>
  );
}
