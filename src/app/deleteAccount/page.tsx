'use client';
import styles from './deleteAccount.module.scss';
import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';
import DeleteAccountForm from '@/src/components/deleteAccountPage/deleteAccountForm';
import { WarnIcon } from '@/public/icon';

const cn = classNames.bind(styles);

const DeleteAccountPage = () => {
  const router = useRouter();
  const backClick = () => {
    router.back();
  };
  return (
    <section className={cn('container')}>
      <header>
        <h2>계정 삭제 전 확인해 주세요</h2>
        <span onClick={backClick} className={cn('back')}>
          답지 보러 돌아가기
        </span>
      </header>
      <ul className={cn('warnLists')}>
        <li>- 다른 클라이머의 답지를 볼 수 없어요</li>
        <li>
          - 게시판에 작성한 글과 댓글은 사라지지 않아요
          <span>
            <WarnIcon width="20" height="20" />
            <strong>지우고 싶은 내용이 있다면 떠나기 전에 삭제해 주세요</strong>
          </span>
        </li>
        <li>- 떠나시면 공유한 답지는 사라져 복구할 수 없어요</li>
      </ul>
      <DeleteAccountForm />
    </section>
  );
};

export default DeleteAccountPage;
