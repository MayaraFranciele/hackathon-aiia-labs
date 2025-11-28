import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ReactNode, useState, useEffect } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  useEffect(() => {
    const root = document.documentElement;

    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
    }
  }, []);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full overflow-hidden bg-background">
        <AppSidebar
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />

        <div className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6 md:px-6 lg:px-8 flex-shrink-0">
            <SidebarTrigger className="shrink-0" />
            <div className="flex-1" />
          </header>

          <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto overflow-x-hidden w-full">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
