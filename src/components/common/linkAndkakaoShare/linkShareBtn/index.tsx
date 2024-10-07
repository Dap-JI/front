'use client';
import classNames from 'classnames/bind';
import styles from './linkShareBtn.module.scss';
import { LinkIcon } from '@/public/icon';
import { useToast } from '@/src/hooks/useToast';
import { useRouter } from 'next/navigation';

const cn = classNames.bind(styles);

type LinkSahreBtnProps = {
  params: { postid: string; gymId: string };
};

const LinkSahreBtn = ({ params }: LinkSahreBtnProps) => {
  const { showToastHandler } = useToast();
  const { postid, gymId } = params;

  const url =
    typeof window !== 'undefined'
      ? `${window.location.origin}/climbList/${gymId}/${postid}`
      : '';
  //사이트 URL

  const copyToClipboard = async (url: any) => {
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
    <>
      <LinkIcon
        className={cn('Link')}
        width="40"
        height="40"
        onClick={handleCopyClick}
      />
    </>
  );
};

export default LinkSahreBtn;
