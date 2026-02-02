"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/ui/DarkModeToggle";

export function ModeToggleWrapper() {
  const { open, isMobile, openMobile } = useSidebar();

  const isSidebarOpen = isMobile ? openMobile : open;

  // Hide when sidebar is open
  if (isSidebarOpen) return null;

  return (
    <div className="fixed md:bottom-6 md:right-24 top-4 right-18 md:top-auto md:left-auto z-50">
      <div className="w-10 h-10 md:w-12 md:h-12">
        <ModeToggle />
      </div>
    </div>
  );
}
