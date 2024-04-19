import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { RootState } from "../lib/store";
import { changeIsFormOpen } from "../lib/features/notes/notesSlice";
import { storeNote } from "../lib/features/notes/notesActions";

export default function AddNoteForm() {
  const [content, setContent] = useState<string>("");
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const color = useAppSelector((state: RootState) => state.notes.color);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(changeIsFormOpen(false));
  };

  const handleSave = () => {
    if (content.trim() === "") {
      setIsEmpty(true);
      return;
    }

    dispatch(
      storeNote({
        content,
        color: color || "orange",
      })
    );
  };

  useEffect(() => {
    setTimeout(() => {
      setIsEmpty(false);
    }, 300);
  }, [isEmpty]);

  return (
    <div
      style={{ backgroundColor: color ? `var(--${color})` : "var(--orange)" }}
      className={`bg-${color ?? "orange"} ${
        isEmpty && "shakeAnimation"
      } form w-full min-w-[288px] aspect-square rounded-xl p-6 flex flex-col relative transition duration-50`}
    >
      <button
        className="bg-white absolute -top-3 -right-3 rounded-full border border-lavender p-1"
        onClick={handleClose}
      >
        <X />
      </button>
      <div className="text-lg flex-grow">
        <textarea
          autoFocus
          className="text-lg text-black bg-transparent w-full h-full outline-0 resize-none"
          value={content}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setContent(e.target.value)
          }
        ></textarea>
      </div>
      <div className="flex items-center justify-end">
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.8 }}
          className="w-[44px] h-[44px] leading-[44px] bg-black text-white rounded-full"
          onClick={handleSave}
        >
          <Plus className="mx-auto w-5" />
        </motion.button>
      </div>
    </div>
  );
}
