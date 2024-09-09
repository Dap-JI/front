import instance from '@/src/utils/axios';
import { useFormNoticeUploadType } from '@/src/utils/type';

//공지 업로드
export const fetchNoticeUpload = async (
  formData: useFormNoticeUploadType,
  gymId: string,
) => {
  const res = await instance.post(`/api/gyms/${gymId}/notice`,formData);
  return res.data;
};
