import instance from '@/src/utils/axios';
import { DeleteAccountType } from '@/src/utils/type';

export const fetchDeleteAccount = async (formData: DeleteAccountType) => {
  const res = await instance.delete(`/api/deleteAccount`, {
    data: formData,
  });
  return res.data;
};

//axios의 delete는 post와 달리 두번째 인자를 옵션 객체로 전달하며 data에 포함시켜야한다.
