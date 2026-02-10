"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import type { Item as ItemType } from "../_engine/types";

interface ItemProps {
  item: ItemType;
}

export const ItemDot = memo(function ItemDot({ item }: ItemProps) {
  return (
    <motion.div
      layoutId={`item-${item.id}`}
      className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold ${
        item.isDefective
          ? "bg-[var(--color-defect,#c0392b)] text-white"
          : "bg-[var(--color-accent)] text-white"
      }`}
      initial={false}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {item.isDefective && "\u00d7"}
    </motion.div>
  );
});
