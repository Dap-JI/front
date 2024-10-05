import useProgressStore from '@/src/utils/store/useProgressStore';
import styles from './ProgressBar.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

const ProgressBar = () => {
  const { progress, setProgress } = useProgressStore();

  return (
    <div className={cn('progressWrapper')}>
      <div className={cn('linearProgressBar')}>
        <div className={cn('progressBar')} style={{ width: `${progress}%` }} />
      </div>
      <span className={cn('progressText')}>{progress}%</span>
    </div>
  );
};

export default ProgressBar;

//비디오 인풋에 동영상 업로드함 => 로컬 미리보기로 영상 미리보기만 보임 => 난이도 및 설명 작성
//=> 업로드 버튼 누르면 업로드하시겟씁니가? 모달 뜨고 확인=>
//=> 페이지 라우팅 된 곳에서 url받고 서버에 게시물 업로드

//현재는 인풋에서 영상업로드 하면 바로 s3에서 url받아오는방법,

//페이지가 다르기 때문에 전역으로 관리해야할듯

//1, isUploading도 전역state로 만들기,progress도 전역으로 만들기

//2. postuploadform에서 페이지 넘어간 후 프로그레스바 보여주기

//3. 그럼 url은 어디서?
