import { create } from "zustand";

interface FileStore {
  file?: File;
  preview?: string;
  setFile: (file: File, preview: string) => void;
  clear: () => void;
}

export const useFileStore = create<FileStore>((set) => ({
  file: undefined,
  preview: undefined,
  setFile: (file, preview) => set({ file, preview }),
  clear: () => set({ file: undefined, preview: undefined }),
}));
