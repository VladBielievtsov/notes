import { Pencil, Plus, X } from "lucide-react";
import { motion } from "framer-motion";
import { INote, removeNote, updateNote } from "../lib/features/notesSlice";
import { useEffect, useRef, useState } from "react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { useAppDispatch } from "../lib/hooks";

export default function NoteCard({ id, color, content, createdAt }: INote) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [maxHeight, setMaxHeight] = useState<number | undefined>(undefined);
  const [updatedContent, setUpdatedContent] = useState<string>(content);
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

  const handleUpdate = () => {
    if (updatedContent.trim() === "") {
      setIsEmpty(true);
      return;
    }
    const date = new Date();
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });

    dispatch(
      updateNote({
        id,
        content: updatedContent,
        color,
        createdAt: formattedDate,
      })
    );

    setEditMode(false);
  };

  return (
    <div className={`relative ${isEmpty && "shakeAnimation"}`}>
      {editMode && (
        <button
          className="bg-white absolute -top-3 -right-3 rounded-full border border-lavender p-1 z-20"
          onClick={handleRemove}
        >
          <X />
        </button>
      )}
      <div
        ref={card}
        className={`w-full min-w-[288px] aspect-square overflow-hidden relative rounded-xl py-6 px-3`}
        style={{ backgroundColor: `var(--${color})` }}
      >
        {!editMode ? (
          <>
            <div className="text-lg pb-[52px]">
              <SimpleBar style={{ maxHeight: maxHeight }}>
                <p className="px-3">{content}</p>
              </SimpleBar>
            </div>
            <div
              className="flex items-center justify-between absolute bottom-0 right-0 left-0 p-4"
              style={{ backgroundColor: `var(--${color})` }}
            >
              <div>{createdAt}</div>
              <motion.button
                onClick={() => setEditMode(true)}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.8 }}
                className="w-[44px] h-[44px] leading-[44px] bg-black text-white rounded-full"
              >
                <Pencil className="mx-auto w-5" />
              </motion.button>
            </div>
          </>
        ) : (
          <>
            <div className="text-lg px-3 h-full pb-[52px]">
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
              className="flex items-center justify-between absolute bottom-0 right-0 left-0 p-4"
              style={{ backgroundColor: `var(--${color})` }}
            >
              <div>{createdAt}</div>
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.8 }}
                className="w-[44px] h-[44px] leading-[44px] bg-black text-white rounded-full"
                onClick={handleUpdate}
              >
                <Plus className="mx-auto w-5" />
              </motion.button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
