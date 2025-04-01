import { create } from "zustand";

export const useThemeStore = create((set) => ({
  //REVIEW we will use localStorage (Cache for theme here !)
  theme: localStorage.getItem("chat-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme }); //REVIEW set the theme 
  },
}));
