'use client';

import classNames from 'classnames/bind';
import styles from './linkShare.module.scss';
import { LinkIcon } from '@/public/icon';
import { useToast } from '@/src/hooks/useToast';
const cn = classNames.bind(styles);

type LinkShare = {
  params: { postid: string; gymId: string };
};

const LinkShare = ({ params }: LinkShare) => {
  const { showToastHandler } = useToast();
  const { postid, gymId } = params;

  const url =
    typeof window !== 'undefined'
      ? `${window.location.origin}/climbList/${gymId}/${postid}`
      : '';
  //사이트 URL

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      showToastHandler('링크를 복사했어요!', 'check');
    } catch (error) {
      console.error(error);
    }
  };

  const handleCopyClick = () => {
    copyToClipboard(url);
  };
  return (
    <LinkIcon
      className={cn('Link')}
      width="24"
      height="24"
      onClick={handleCopyClick}
    />
  );
};

export default LinkShare;
