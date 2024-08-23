'use client';
import styles from './boardUploadForm.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { categoryListData } from '@/src/utils/dummy';
import CategoryLists from '../../boardPage/categroyLists';
import CommonInput from '../../common/commonInput';
import CommonButton from '@/src/components/common/commonButton';
import { useForm, useWatch } from 'react-hook-form';
import { useFormBoardUploadType } from '@/src/utils/type';
import BoardImageInput from '@/src/components/boardUploadPage/boardImageInput';
import { boardUploadData, useBoardImageDelete } from '@/src/app/board/api';
import { useMutation } from '@tanstack/react-query';
import { useModal } from '@/src/hooks/useModal';
import ModalChoice from '@/src/components/common/moadlChoice';
import { useRouter } from 'next/navigation';

const cn = classNames.bind(styles);

const BoardUploadForm = () => {
  const [fileUrl, setFileUrl] = useState<string[]>([]);
  const [deleteUrl, setDeleteUrl] = useState<string[]>([]);
  const [selectCategory, setSelectCategory] = useState<string | null>(null);
  const { showModalHandler } = useModal();
  const router = useRouter();
  const { mutate: imageDelete } = useBoardImageDelete();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<useFormBoardUploadType>();

  const { mutate: boardUpload } = useMutation({
    mutationKey: ['boardUpload'],
    mutationFn: (formData) => boardUploadData(formData),
    onSuccess: () => {
      router.push('/board');
    },
    onError: (e) => {
      console.error(e, '게시물 업로드 에러러');
    },
  });

  const titleValue = useWatch({ control, name: 'title' }) || '';
  const contentValue = useWatch({ control, name: 'content' }) || '';

  // fieldLength 함수를 단순화
  const fieldLength = (value: string, maxLength: number) => ({
    length: value.length,
    maxLength,
  });

  const title = fieldLength(titleValue, 50);
  const content = fieldLength(contentValue, 5000);
  
  //글자수 조회, 이렇게 할거면 그냥 단순하게 하는게 나을듯

  //카테고리 선택
  const uploadCategory = categoryListData.filter(
    (category) => category.category !== '전체',
  );
  //카테고리 필터 (전체 제외)
  const handleSelectCategory = (category: string) => {
    setSelectCategory(category);
  };
  //카테고리 셀렉

  const onSubmit = (data: any) => {
    const formData = {
      ...data,
      category: selectCategory,
      img: fileUrl,
    };

    const handleVideoDeletion = () => {
      deleteUrl.forEach((url) => {
        imageDelete(url);
      });
    };

    const confirmAction = () => {
      boardUpload(formData);
      handleVideoDeletion();
    }; // 데이터와 함께 호출

    // const message = initialData
    //   ? '답지를 수정 하시나요?'
    //   : '답지를 업로드 하시나요?';

    // showModalHandler('choice', message, confirmAction);
    showModalHandler('choice', '게시물을 업로드하시겠어요?', confirmAction);
  };

  return (
    <form className={cn('container')} onSubmit={handleSubmit(onSubmit)}>
      <CategoryLists
        lists={uploadCategory}
        selectCategory={selectCategory}
        onCategorySelect={handleSelectCategory}
      />

      <div className={cn('titleContainer')}>
        <CommonInput
          placeholder="제목을 입력해 주세요"
          id="title"
          type="string"
          register={register('title', {
            required: '제목을 입력해 주세요',
            maxLength: {
              value: 50,
              message: '최대 50자까지 가능해요',
            },
          })}
        />
        <small className={cn('titleCount')}>
          {title.length}/{title.maxLength}
        </small>
      </div>
      {errors.title && (
        <small className={styles.error_text}>
          {errors.title.message as string}
        </small>
      )}

      <div className={cn('textareaContainer')}>
        <textarea
          className={cn('textArea')}
          maxLength={content.maxLength}
          {...register('content', {
            required: '내용을 입력해 주세요',
          })}
        />
        <small className={cn('contentCount')}>
          {content.length}/{content.maxLength}
        </small>
      </div>
      {errors.content && (
        <small className={styles.error_text}>
          {errors.content.message as string}
        </small>
      )}
      <BoardImageInput
        fileUrl={fileUrl}
        setFileUrl={setFileUrl}
        setDeleteUrl={setDeleteUrl}
      />

      <CommonButton name="업로드 " type="submit" />
      <ModalChoice />
    </form>
  );
};

export default BoardUploadForm;
