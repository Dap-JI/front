import instance from '@/src/utils/axios';
import { useFormNoticeUploadType } from '@/src/utils/type';

//공지 업로드
export const fetchNoticeUpload = async (
  formData: useFormNoticeUploadType,
  gymId: string,
) => {
  const res = await instance.post(`/api/gyms/${gymId}/notice`, formData);
  return res.data;
};

//공지 수정
export const fetchNoticeUpdate = async (
  formData: useFormNoticeUploadType,
  gymId: string,
  noticeId: string | undefined,
) => {
  const res = await instance.patch(
    `/api/gyms/${gymId}/notice/${noticeId}`,
    formData,
  );
  return res.data;
};
