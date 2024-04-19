import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { RootState } from "../lib/store";
import AddNoteForm from "./AddNoteForm";
import NoteCard from "./NoteCard";
import { getNotes } from "../lib/features/notes/notesActions";

export default function NotesList() {
  const notesList = useAppSelector((state: RootState) => state.notes.list);
  const isFormOpen = useAppSelector(
    (state: RootState) => state.notes.isFormOpen
  );

  const dispatch = useAppDispatch();

  const notesStatus = useAppSelector((state: RootState) => state.notes.status);

  useEffect(() => {
    if (notesStatus === "idle") {
      dispatch(getNotes());
    }
  }, [notesStatus, dispatch]);

  let content = null;

  if (notesStatus === "idle" || notesStatus === "loading") {
    content = <h3 className="font-bold text-lg">loading</h3>;
  } else if (notesStatus === "failed") {
    content = <h3 className="font-bold text-lg">Something went wrong :(</h3>;
  } else if (notesStatus === "succeeded") {
    content = (
      <>
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
      </>
    );
  }

  return (
    <div
      className="grid gap-10"
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(288px, 303px))",
      }}
    >
      {content}
    </div>
  );
}
