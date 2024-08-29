'use client';
import { CloseIcon, UpIcon } from '@/public/icon';
import CommonInput from '../../common/commonInput';
import styles from './commentInput.module.scss';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import {
  boardCommentUploadData,
  boardRecommentUploadData,
} from '@/src/app/board/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  BoardCommentUploadType,
  BoardRecommentUploadType,
} from '@/src/utils/type';
import { useModal } from '@/src/hooks/useModal';
import { useEffect } from 'react';

const cn = classNames.bind(styles);

type CommentInputProps = {
  params: {
    boardId: string;
  };
  tagNickname: string;
  setTagNickname: React.Dispatch<React.SetStateAction<string>>;
  selectId: string;
};

const CommentInput = ({
  params,
  tagNickname,
  setTagNickname,
  selectId,
}: CommentInputProps) => {
  const { register, handleSubmit, reset, setValue } =
    useForm<BoardCommentUploadType>();
  const { boardId } = params;
  const { showModalHandler } = useModal();
  const queryClient = useQueryClient();

  const { mutate: boardCommentUpload } = useMutation({
    mutationKey: ['boardCommentUpload'],
    mutationFn: (formData: BoardCommentUploadType) =>
      boardCommentUploadData(formData),
    onSuccess: () => [
      queryClient.invalidateQueries({ queryKey: ['boardDetailComment'] }),
    ],
    onError: () => {
      showModalHandler('alert', '댓글을 다시 업로드해 주세요');
    },
  });

  const { mutate: boardReCommentUpload } = useMutation({
    mutationKey: ['boardReCommentUpload'],
    mutationFn: (formData: BoardRecommentUploadType) =>
      boardRecommentUploadData(formData),
    onSuccess: () => [
      queryClient.invalidateQueries({ queryKey: ['boardRecomment'] }),
    ],
    onError: () => {
      showModalHandler('alert', '답글을 다시 업로드해 주세요');
    },
  });

  const onSubmit = (data: any) => {
    let formData;

    if (tagNickname) {
      formData = {
        ...data,
        comment_idx: selectId,
      };
      boardReCommentUpload(formData);
      return;
    } else {
      formData = {
        ...data,
        board_idx: boardId,
      };
      boardCommentUpload(formData);
    }

    reset();
  };

  const handleTagCloseClick = () => {
    setTagNickname('');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn('formWrapper')}>
      <CommonInput
        className={cn('customInput', `${tagNickname && 'tagNameInput'}`)}
        register={register('content', {
          required: '댓글을 입력해주세요',
        })}
        suffix={
          <>
            <div className={cn('iconWrapper')}>
              <button type="submit">
                <UpIcon width="20" height="20" />
              </button>
            </div>
            {tagNickname && (
              <div className={cn('tagNickname')}>
                <span>{tagNickname}님에게 답글 작성 중...</span>
                <CloseIcon
                  width="10"
                  height="10"
                  onClick={handleTagCloseClick}
                />
              </div>
            )}
          </>
        }
      />
    </form>
  );
};

export default CommentInput;

//id를 전역으로해야되겠따
