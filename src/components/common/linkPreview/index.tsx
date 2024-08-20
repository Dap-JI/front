import styles from './linkPreview.module.scss';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { LinkPreviewType } from '@/src/utils/dummy';
import useTruncateString from '@/src/hooks/useTruncateString';

const cn = classNames.bind(styles);

type LinkPreviewProps = {
  linkPreview: LinkPreviewType;
};

const LinkPreview = ({ linkPreview }: LinkPreviewProps) => {
  const truncateString = useTruncateString();

  return (
    <div className={cn('linkPreview')}>
      <Image
        src={linkPreview.img || '/icon/icon.png'}
        alt="링크 미리보기"
        height="50"
        width="50"
        className={cn('linkpreviewimage')}
      />
      <div className={cn('linkContentWrapper')}>
        <p>{truncateString(linkPreview.title || '', 40)}</p>
        <span>{truncateString(linkPreview.link || '', 40)}</span>
      </div>
    </div>
  );
};

export default LinkPreview;
