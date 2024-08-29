'use client';
import { CloseIcon, UpIcon } from '@/public/icon';
import CommonInput from '../../common/commonInput';
import styles from './commentInput.module.scss';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import {
  useCommentUploadData,
  useRecommentUploadData,
} from '@/src/hooks/useCommentDatas';
import { BoardCommentUploadType } from '@/src/utils/type';

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

  const { mutate: boardCommentUpload } = useCommentUploadData({
    category: 'comment',
    mainKey: 'boardCommentUpload',
    firKey: 'boardDetailComment',
  });

  const { mutate: boardReCommentUpload } = useRecommentUploadData({
    category: 'recomment',
    mainKey: 'boardReCommentUpload',
    firKey: 'boardRecomment',
    secKey: 'boardDetailComment',
  });

  const onSubmit = (data: any) => {
    let formData;

    if (tagNickname) {
      formData = {
        ...data,
        comment_idx: selectId,
      };
      boardReCommentUpload(formData);
    } else {
      formData = {
        ...data,
        board_idx: boardId,
      };
      boardCommentUpload(formData);
    }

    reset(); // 폼 필드를 리셋
  };

  const handleTagCloseClick = () => {
    setTagNickname('');
    setValue('content', '');
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
                <span>{tagNickname}님에게 답글 작성 하기</span>
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
