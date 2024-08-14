'use client';
import classNames from 'classnames/bind';
import styles from './detailMainContent.module.scss';
import { DoubleRightArrowIcon } from '@/public/icon';
import { useRouter } from 'next/navigation';
import {
  DetailMainContentProps,
  DetailType,
  DetailMainContentListProps,
} from '@/src/utils/type';
import usePostStore from '@/src/utils/store/usePostStore';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const cn = classNames.bind(styles);

const DetailMainContent = ({ list }: DetailMainContentProps) => {
  const { color, User, clearday, content, post_idx, media, gym_idx, user_idx } =
    list;

  const router = useRouter();
  const setPostData = usePostStore((state) => state.setPostData);

  const postDetailPage = () => {
    setPostData(list);
    router.push(`/climbList/${gym_idx}/${post_idx}`);
  };

  const deleteT = (date: string | null) => date?.split('T')[0];

  const profileClick = () => {
    router.push(`/profile/${user_idx}`);
  };
  console.log(list);
  return (
    <div className={cn('container')}>
      <div className={cn('videoWrapper')}>
        {/* {media?.map((mideaUrl, index) => (
          <div key={index} className={cn('videoBox')}>
            <video
              src={mideaUrl}
              autoPlay
              muted
              controls
              playsInline
              controlsList="nodownload"
            />
          </div>
        ))} */}
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
        <DoubleRightArrowIcon onClick={postDetailPage} />
      </div>
      <p>{content}</p>
    </div>
  );
};
//여기도 비디오 배열로 , react-slick

const DetailMainContentList = ({ lists }: DetailMainContentListProps) => {
  return (
    <div className={cn('listContainer')}>
      {lists?.map((list: DetailType) => (
        <DetailMainContent key={list.post_idx} list={list} />
      ))}
    </div>
  );
};

export default DetailMainContentList;
