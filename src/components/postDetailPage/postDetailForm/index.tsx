'use client';
import React from 'react';
import styles from './postDetailForm.module.scss';
import classNames from 'classnames/bind';
import { ShareIcon, DeleteIcon, EditIcon } from '@/public/icon';
import LoadingSpinner from '../../common/loadingSpinner';
import { useRouter } from 'next/navigation';
import {
  usePostDetailDatas,
  usePostDetailDelete,
} from '@/src/app/climbList/api';
import { useToast } from '@/src/hooks/useToast';
import { useMyInfoStore } from '@/src/hooks/useMyImfoStore';
import Image from 'next/image';
import { useModal } from '@/src/hooks/useModal';
import ModalChoice from '../../common/moadlChoice';
import KakaoShare from '../../common/kakaoShare';
import newKakao from '@/src/components/common/kakaoShare/newKakao';
const cn = classNames.bind(styles);

type PostDetailFormProps = {
  params: { postid: string; gymId: string };
};

const PostDetailForm = ({ params }: PostDetailFormProps) => {
  const router = useRouter();
  const { showToastHandler } = useToast();
  const { postid, gymId } = params;
  const { data: postDetailDatas, isLoading } = usePostDetailDatas(postid);
  const { mutate: postDetailDelete } = usePostDetailDelete(postid, gymId);
  const { userId } = useMyInfoStore();
  const { showModalHandler } = useModal();

  if (isLoading || !postDetailDatas) {
    return <LoadingSpinner />;
  }
  const { gym_idx, post_idx, media, color, clearday, User, content, user_idx } =
    postDetailDatas;

  const isNotMyUserId = userId !== user_idx;

  const deleteT = (date: string | null) => date?.split('T')[0];

  const editPage = () => {
    router.push(`/climbList/${gym_idx}/${post_idx}/edit`);
  };

  const deleteClick = () => {
    const confirmAction = () => {
      postDetailDelete();
    };
    showModalHandler('choice', '정말 삭제하시겠어요?', confirmAction);
  };

  const profileClick = () => {
    router.push(`/profile/${user_idx}`);
  };

  const url =
    typeof window !== 'undefined'
      ? `${window.location.origin}/climbList/${gym_idx}/${post_idx}`
      : '';

  const copyToClipboard = async (text: any) => {
    try {
      await navigator.clipboard.writeText(text);
      showToastHandler('링크를 복사했습니다!', 'check');
    } catch (error) {
      console.error(error);
    }
  };

  const handleCopyClick = () => {
    copyToClipboard(url);
  };

  return (
    <div className={cn('container')}>
      <div className={cn('btnStyle')}>
        {!isNotMyUserId && (
          <>
            <EditIcon onClick={editPage} />
            <DeleteIcon onClick={deleteClick} />
          </>
        )}
        {/* <KakaoShare url={url} /> */}
        <ShareIcon onClick={handleCopyClick} />
      </div>
      <div className={cn('videoWrapper')}>
        <video
          src={media}
          autoPlay
          muted
          controls
          playsInline
          controlsList="nodownload"
        />
      </div>
      <div className={cn('infoWrapper')}>
        <div className={cn('color', `color-${color}`)} />
        <span>{deleteT(clearday)}</span>
        <div className={cn('userWrapper')} onClick={profileClick}>
          <Image src={User.img} width="24" height="24" alt="userImg" />
          <span>{User.nickname}</span>
        </div>
      </div>
      <p>{content}</p>
      <ModalChoice />
    </div>
  );
};

export default PostDetailForm;

//다른사람이 볼때 수정 삭제는 안보임
// 수정페이지 안에 삭제 넣기
//myinfo랑 비교하기
