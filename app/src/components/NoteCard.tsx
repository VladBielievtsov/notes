import { Pencil } from "lucide-react";
import { motion } from "framer-motion";
import { INote } from "../lib/features/notesSlice";
import { useEffect, useRef, useState } from "react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

export default function NoteCard({ color, content, createdAt }: INote) {
  const [maxHeight, setMaxHeight] = useState<number | undefined>(undefined);
  const card = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (card.current) {
      setMaxHeight(card.current.clientHeight - 48);
    }
  }, [content]);

  return (
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
        <div>{createdAt}</div>
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.8 }}
          className="w-[44px] h-[44px] leading-[44px] bg-black text-white rounded-full"
        >
          <Pencil className="mx-auto w-5" />
        </motion.button>
      </div>
    </div>
  );
}
