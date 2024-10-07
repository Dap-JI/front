import { create } from 'zustand';

interface isUploadingType {
  isUploading: boolean;
  setIsUploading: (data: boolean) => void;
}

const useIsUploadingStore = create<isUploadingType>((set) => ({
  isUploading: false,
  setIsUploading: (data: boolean) => set({ isUploading: data }),
}));

export default useIsUploadingStore;
