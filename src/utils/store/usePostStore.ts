import { create } from 'zustand';

interface PostData {
  color: string;
  User: {
    nickname: string;
  };
  clearday: string;
  content: string | null;
  post_idx: number;
  media: string[];
  gym_idx: string | number;
  createdAt?: string;
  thumbnailUrl?: string[];
  user_idx?: number;
}

interface PostStore {
  postData: PostData | null;
  setPostData: (data: PostData) => void;
}

const usePostStore = create<PostStore>((set) => ({
  postData: null,
  setPostData: (data) => set({ postData: data }),
}));

export default usePostStore;
