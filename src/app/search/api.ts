import instance from '@/src/utils/axios';

type fetchUserSearchProps = {
  page: number;
  search: string;
};

export const fetchUserSearch = async ({
  page,
  search,
}: fetchUserSearchProps) => {
  const res = await instance.get(`/api/userSearch`, {
    params: {
      page,
      search,
    },
  });
  return res.data;
};
