import { Pencil, Plus, Trash, X } from "lucide-react";
import { motion } from "framer-motion";
import { INote } from "../lib/features/notes/notesSlice";
import { useEffect, useRef, useState } from "react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { useAppDispatch } from "../lib/hooks";
import { COLORS } from "./AddNoteBtn";
import { editNote, removeNote } from "../lib/features/notes/notesActions";

export default function NoteCard({ id, color, content, createdAt }: INote) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [maxHeight, setMaxHeight] = useState<number | undefined>(undefined);
  const [updatedContent, setUpdatedContent] = useState<string>(content);
  const [updatedColor, setUpdatedColor] = useState<string>(color);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const card = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (card.current) {
      setMaxHeight(card.current.clientHeight - 48);
    }
  }, [content]);

  const handleRemove = () => {
    dispatch(removeNote(id));
  };

  useEffect(() => {
    setTimeout(() => {
      setIsEmpty(false);
    }, 300);
  }, [isEmpty]);

  const formattedDate = () => {
    const date = new Date(createdAt);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  const cancelEdit = () => {
    setEditMode(false);
    setUpdatedColor(color);
    setUpdatedContent(content);
  };

  const handleUpdate = () => {
    if (updatedContent.trim() === "") {
      setIsEmpty(true);
      return;
    }

    dispatch(
      editNote({
        id,
        content: updatedContent,
        color: updatedColor,
      })
    ).then(() => {
      setEditMode(false);
    });
  };

  return (
    <div className={`relative ${isEmpty && "shakeAnimation"}`}>
      {editMode && (
        <button
          onClick={cancelEdit}
          className="bg-white absolute -top-3 -right-3 rounded-full border border-lavender p-1 z-20"
        >
          <X />
        </button>
      )}
      <>
        {!editMode ? (
          <div
            ref={card}
            className={`w-full min-w-[288px] aspect-square overflow-hidden relative rounded-xl py-6 px-3`}
            style={{ backgroundColor: `var(--${color})` }}
          >
            <div className="text-lg pb-[52px]">
              <SimpleBar style={{ maxHeight: maxHeight }}>
                <p className="px-3">{content}</p>
              </SimpleBar>
            </div>
            <div
              className="flex items-center justify-between absolute bottom-0 right-0 left-0 p-4"
              style={{ backgroundColor: `var(--${color})` }}
            >
              <div>{formattedDate()}</div>
              <motion.button
                onClick={() => setEditMode(true)}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.8 }}
                className="w-[44px] h-[44px] leading-[44px] bg-black text-white rounded-full"
              >
                <Pencil className="mx-auto w-5" />
              </motion.button>
            </div>
          </div>
        ) : (
          <>
            <div
              style={{
                backgroundColor: `var(--${updatedColor})`,
              }}
              className={`bg-${updatedColor ?? "orange"} ${
                isEmpty && "shakeAnimation"
              } form w-full min-w-[288px] aspect-square rounded-xl p-6 flex flex-col overflow-hidden relative transition duration-50`}
            >
              <div className="text-lg h-full pb-[52px]">
                <textarea
                  autoFocus
                  className="text-lg text-black bg-transparent w-full h-full outline-0 resize-none"
                  value={updatedContent}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setUpdatedContent(e.target.value)
                  }
                ></textarea>
              </div>
              <div
                className="flex items-center justify-between absolute bottom-0 right-0 left-0 p-4 transition duration-50"
                style={{ backgroundColor: `var(--${updatedColor})` }}
              >
                <div>{formattedDate()}</div>
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.8 }}
                    className="w-[44px] h-[44px] leading-[44px] bg-black text-white rounded-full"
                    onClick={handleRemove}
                  >
                    <Trash className="mx-auto w-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.8 }}
                    className="w-[44px] h-[44px] leading-[44px] bg-black text-white rounded-full"
                    onClick={handleUpdate}
                  >
                    <Plus className="mx-auto w-5" />
                  </motion.button>
                </div>
              </div>
            </div>
            <div className={`absolute flex -bottom-5 h-[20px] w-full`}>
              {COLORS.map((color, id) => (
                <motion.button
                  key={id}
                  animate={{ y: 10, opacity: 1 }}
                  transition={{ ease: "linear", delay: id * 0.1 }}
                  className={`w-[20px] h-[20px] opacity-0 rounded-full mx-auto block transition`}
                  style={{ backgroundColor: `var(--${color})` }}
                  onClick={() => setUpdatedColor(color)}
                ></motion.button>
              ))}
            </div>
          </>
        )}
      </>
    </div>
  );
}
