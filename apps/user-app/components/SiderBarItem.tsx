"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export const SidebarItem = ({
  href,
  title,
  icon,
  isActive,
  comingSoon,
}: {
  href: string;
  title: string;
  icon: React.ReactNode;
  isActive?: boolean;
  comingSoon?: boolean;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const selected = isActive !== undefined ? isActive : pathname === href;

  return (
    <motion.div
      whileHover={{ x: 3 }}
      whileTap={{ scale: 0.98 }}
      className={`flex items-center relative rounded-md ${
        selected 
          ? "text-accent-blue-light" 
          : comingSoon 
            ? "text-slate-400" 
            : "text-slate-300"
      } cursor-pointer p-2 md:pl-6 w-full transition-colors duration-200 hover:bg-dark-200/40`}
      onClick={() => {
        if (comingSoon) {
          toast.info(`${title} will be available soon!`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          router.push(href);
        }
      }}
    >
      {selected && !comingSoon && (
        <motion.div
          layoutId="sidebar-indicator"
          className="absolute left-0 w-1 h-6 bg-gradient-to-b from-accent-blue to-accent-green rounded-r-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
      <div className="pr-3 text-slate-400">{icon}</div>
      <div
        className={`font-medium text-sm ${
          selected 
            ? "text-accent-blue-light" 
            : comingSoon 
              ? "text-slate-400" 
              : "text-slate-300"
        }`}
      >
        {title}
        {comingSoon && (
          <span className="ml-2 text-[10px] px-1.5 py-0.5 bg-accent-blue/10 text-accent-blue-light rounded-full">
            Soon
          </span>
        )}
      </div>
    </motion.div>
  );
};
