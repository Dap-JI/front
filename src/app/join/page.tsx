'use client';
import classNames from 'classnames/bind';
import styles from './joinPage.module.scss';
import CommonInput from '@/src/components/common/commonInput';
import { useForm } from 'react-hook-form';
import { nickname_reg } from '@/src/utils/regex';
import CommonButton from '@/src/components/common/commonButton';
import { useNicknameCheck, useInitializeNickname } from './api';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useModal } from '@/src/hooks/useModal';
import ModalChoice from '@/src/components/common/moadlChoice';

const cn = classNames.bind(styles);

type onSubmitType = {
  nickname: string;
};

//일단 enabled 설저해야 하니까 state하나 만들어서 true로 만들어줘야함

const JoinPage = () => {
  const router = useRouter();
  const { showModalHandler } = useModal();
  const { mutate: initializeNickname } = useInitializeNickname();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nickname: '',
    },
  });

  const nickname = watch('nickname');

  const { refetch } = useNicknameCheck(nickname, false);

  const onSubmit = async (data: any) => {
    const formData = {
      ...data,
    };
    try {
      const { data: nicknameCheck } = await refetch();
      if (nicknameCheck?.data.available) {
        initializeNickname(formData);
        showModalHandler('alert', '답지를 즐겨보세요🔥');
        setTimeout(() => {
          router.push('/climbList');
        }, 1300);
        return;
      }
      showModalHandler('alert', '닉네임이 중복되었어요');
    } catch (error) {
      showModalHandler('alert', '닉네임 확인 중 문제가 발생했습니다.');
    }
  };

  return (
    <form className={cn('container')} onSubmit={handleSubmit(onSubmit)}>
      <h1>답지 가입을 환영해요🙌</h1>
      <p>사용하실 닉네임을 입력해주세요</p>
      <CommonInput
        placeholder="닉네임을 입력해주세요"
        type="text"
        register={register('nickname', {
          required: '닉네임을 입력해주세요',
          maxLength: {
            value: 10,
            message: '최대 10자까지 가능합니다.',
          },
          minLength: {
            value: 2,
            message: '최소 2글자 이상 입력해주세요.',
          },
          pattern: {
            value: nickname_reg,
            message: '한글, 소문자, 숫자만 가능합니다',
          },
        })}
      />
      {errors.nickname && <span>{errors.nickname.message}</span>}
      <CommonButton name="가입하기" type="submit" />
      <ModalChoice />
    </form>
  );
};

export default JoinPage;

//닉네임 중복을 확인하는 컴포넌트이다.
//nickname을 패스파라미터로 받고 enabled를 설정해 true일때만 api를 요청하도록 설정
//-> enabled를 true로 바꾸기 위한 state를 하나 설정하고 인풋에 입력한 nickname을 담을 state하나 설정
//   const onSubmit = (data: onSubmitType) => {
//   setNickname(data.nickname);
//   setCheck(true);
// };
// onSubmit에 닉네임가 enabeldtrue를 담고 실행하면 가입하기 버튼을 눌렀을 때만 함수 실행
//-> 중복된 닉네임이면 409에러 발생
//409에러 발생이면 모달을 보여주고 싶음 근데
//첫 409에러 발생하고 모달이 나올줄 알았는데 3번 요청 된후 4번째에 모달이 나옴
// 이유는 queryProvier 설정할 때 에러시 데이터 요청 3번 가능하도록 설정한 것 때문인듯
// query요청 함수에 retry :0 으로 해놓고 실행하니 가입하기 한번 누른후 -> api요청 -> 모달 잘 나옴
