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
import {
  BoardCommentUploadType,
  PostCommentUploadType,
} from '@/src/utils/type';

const cn = classNames.bind(styles);

type CommentInputProps = {
  params: {
    boardId?: string; // `boardId`는 선택적
    postId?: string; // `postId`도 선택적
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
  const { register, handleSubmit, reset, setValue } = useForm<
    BoardCommentUploadType | PostCommentUploadType
  >();
  const { boardId, postId } = params;

  const { mutate: boardCommentUpload } = useCommentUploadData({
    category: 'comment',
    mainKey: 'boardCommentUpload',
    firKey: 'boardDetailComment',
    secKey: 'boardDetailData',
  });

  const { mutate: boardReCommentUpload } = useRecommentUploadData({
    category: 'recomment',
    mainKey: 'boardReCommentUpload',
    firKey: 'boardRecomment',
    secKey: 'boardDetailComment',
  });

  const { mutate: postCommentUpload } = useCommentUploadData({
    category: 'postComment',
    mainKey: 'postCommentUpload',
    firKey: 'postDetailComment',
    secKey: 'postDetailDatas',
  });

  const { mutate: postReCommentUpload } = useRecommentUploadData({
    category: 'postRecomment',
    mainKey: 'postReCommentUpload',
    firKey: 'postRecomment',
    secKey: 'postDetailComment',
  });

  // 댓글에 id, 답글에 태그네임
  const onSubmit = (data: any) => {
    const isBoard = Boolean(boardId); //boardId가 존재하면 true
    const idKey = isBoard ? 'board_idx' : 'post_idx'; // 댓글에 필요한 id =>  board, post
    const reCommentIdxKey = isBoard ? 'comment_idx' : 'post_comment_idx'; // 답글에 필요한 id => comment_Idx, post_comment_idx
    const id = isBoard ? boardId : postId;

    const formData = {
      ...data, // content
      [tagNickname ? reCommentIdxKey : idKey]: tagNickname ? selectId : id,
      //tagNickname이 선택되면 reCommentIdxKey이 키로 선택 아니면 idkey
      //tagNickname이true면 선택된 id가 false면 id 사용
      //tagNickname이true면 ...data, comment_idx : selectId
    };

    if (tagNickname) {
      isBoard ? boardReCommentUpload(formData) : postReCommentUpload(formData);
      reset();
      return;
    }
    isBoard ? boardCommentUpload(formData) : postCommentUpload(formData);
    reset();
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
