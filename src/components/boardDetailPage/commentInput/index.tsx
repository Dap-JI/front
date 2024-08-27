'use client';
import { UpIcon } from '@/public/icon';
import CommonInput from '../../common/commonInput';
import styles from './commentInput.module.scss';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import { boardCommentUploadData } from '@/src/app/board/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BoardCommentUploadType } from '@/src/utils/type';
import { useModal } from '@/src/hooks/useModal';

const cn = classNames.bind(styles);

type CommentInputProps = {
  params: {
    boardId: string;
  };
};

const CommentInput = ({ params }: CommentInputProps) => {
  const { register, handleSubmit, reset } = useForm<BoardCommentUploadType>();
  const { boardId } = params;
  const { showModalHandler } = useModal();
  const queryClient = useQueryClient();

  const { mutate: boardCommentUpload } = useMutation({
    mutationKey: ['boardCommentUpload'],
    mutationFn: (formData: BoardCommentUploadType) =>
      boardCommentUploadData(formData),
    onSuccess: () => [
      queryClient.invalidateQueries({ queryKey: ['boardDetailCommentlData'] }),
    ],
    onError: () => {
      showModalHandler('alert', '댓글 생성에 실패했어요');
    },
  });

  const onSubmit = (data: BoardCommentUploadType) => {
    const formData = {
      ...data,
      board_idx: boardId,
    };
    boardCommentUpload(formData);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CommonInput
        className={cn('customInput')}
        register={register('content')}
        suffix={
          <div className={cn('iconWrapper')}>
            <button type="submit">
              <UpIcon width="20" height="20" />
            </button>
          </div>
        }
      />
    </form>
  );
};

export default CommentInput;
