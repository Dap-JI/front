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
        <h1>계정 삭제 전 확인해 주세요</h1>
        <span onClick={backClick} className={cn('back')}>
          답지 보러 돌아가기
        </span>
      </header>
      <h2>떠나게 되면 ...</h2>
      <ul className={cn('warnLists')}>
        <li>
          - 회원님의 <strong>답지(동영상)는 삭제</strong>되고 복구할 수 없어요
        </li>
        <li>
          - 다른 클라이머의 <strong>답지를 볼 수 없어요</strong>
        </li>
        <li>
          - 게시판에 작성한 <strong>글과 댓글은 사라지지 않아요</strong>
        </li>
        <li>
          <WarnIcon width="20" height="20" />
          <strong>지우고 싶은 내용이 있다면 떠나기 전에 삭제해 주세요</strong>
        </li>
      </ul>
      <DeleteAccountForm />
    </section>
  );
};

export default DeleteAccountPage;
