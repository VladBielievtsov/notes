import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { changeIsFormOpen, selectColor } from "../lib/features/notesSlice";
import { RootState } from "../lib/store";

export default function AddNoteBtn() {
  const [clicked, setClicked] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const isFormOpen = useAppSelector(
    (state: RootState) => state.notes.isFormOpen
  );

  const handleClick = () => {
    setClicked(true);
    setOpen(!open);
    setTimeout(() => {
      setClicked(false);
    }, 230);
  };

  const colors = ["yellow", "orange", "purple", "blue", "khaki"];

  const handleColor = (color: string) => {
    dispatch(selectColor(color));
    if (!isFormOpen) {
      dispatch(changeIsFormOpen(true));
    }
  };

  useEffect(() => {
    if (!isFormOpen) {
      setOpen(false);
    }
  }, [isFormOpen]);

  return (
    <div className="flex flex-col items-center relative">
      <motion.button
        animate={{
          y: clicked ? -10 : 0,
          rotate: clicked ? 180 : 0,
          scale: clicked ? 0.85 : 1,
          borderRadius: clicked ? 100 : 8,
        }}
        onClick={handleClick}
        className="w-[44px] h-[44px] leading-[44px] bg-black text-white relative z-10"
      >
        <Plus className="mx-auto" />
      </motion.button>
      <div
        className={`absolute top-3 block w-[20px] overflow-hidden`}
        style={{ height: colors.length * 70 + "px" }}
      >
        {colors.map((color, id) => (
          <motion.button
            key={id}
            animate={{ y: open ? 50 * id + 50 : 0 }}
            className={`absolute top-0 left-0 w-[20px] h-[20px] rounded-full mx-auto block`}
            style={{ backgroundColor: `var(--${color})` }}
            onClick={() => handleColor(color)}
          ></motion.button>
        ))}
      </div>
    </div>
  );
}
