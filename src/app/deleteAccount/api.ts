import instance from '@/src/utils/axios';

export const fetchDeleteAccount = async () => {
  const res = await instance.delete(`/api/deleteAccount`);
  return res.data;
};
