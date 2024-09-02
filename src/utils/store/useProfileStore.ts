import { create } from 'zustand';
import { ProfilePostType } from '@/src/utils/type';
import fetchData from '../fetchData';

interface ProfileState {
  profileData: ProfilePostType | null;
  error: Error | null;
  isLoading: boolean;
  loadProfileData: () => Promise<void>;
}

export const useProfileStore = create((set) => ({
  profileData: null,
  error: null,
  isLoading: false,
  loadProfileData: (data: any) => set({ profileData: data, isLoading: false }),
  setLoading: (loading: any) => set({ isLoading: loading }),
  setError: (error: any) => set({ error }),
}));
