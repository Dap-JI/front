import { create } from 'zustand';

interface PostData {
  color: string;
  User: {
    nickname: string;
  };
  clearday: string;
  content: string | null;
  post_idx: string;
  media: string[];
  gym_idx: string | number;
  createdAt?: string;
  thumbnailUrl?: string[];
  user_idx?: number;
  like_count: number;
  is_like: boolean;
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
