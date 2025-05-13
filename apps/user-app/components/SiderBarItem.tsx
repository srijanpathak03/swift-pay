"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";

export const SidebarItem = ({
  href,
  title,
  icon,
}: {
  href: string;
  title: string;
  icon: React.ReactNode;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const selected = pathname === href;

  return (
    <motion.div
      whileHover={{ x: 3 }}
      whileTap={{ scale: 0.98 }}
      className={`flex items-center relative rounded-md ${
        selected 
          ? "text-accent-blue-light" 
          : "text-slate-300"
      } cursor-pointer p-2 md:pl-8 w-svw`}
      onClick={() => {
        router.push(href);
      }}
    >
      {selected && (
        <motion.div
          layoutId="sidebar-indicator"
          className="absolute left-0 w-1 h-6 bg-gradient-to-b from-accent-blue to-accent-green rounded-r-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
      <div className="pr-1 md:pr-2">{icon}</div>
      <div
        className={`md:font-bold font-semibold text-sm ${
          selected 
            ? "text-accent-blue-light" 
            : "text-slate-300"
        }`}
      >
        {title}
      </div>
    </motion.div>
  );
};
