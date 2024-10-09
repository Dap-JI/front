import React from 'react';
import CommonButton from '../../common/commonButton';
import styles from './deleteAccountForm.module.scss';
import classNames from 'classnames/bind';
const cn = classNames.bind(styles);

const DeleteAccountForm = () => {
  return (
    <form className={cn('container')}>
      <h3>✅ 답지를 떠나시는 이유를 알려주세요</h3>
      <div className={cn('reasonCheck')}>
        <label>
          <input type="checkbox" name="reason" value="nothing" />
          별다른 이유 없어요
        </label>

        <label>
          <input type="checkbox" name="reason" value="contentLacking" />
          콘텐츠가 부족해요
        </label>

        <label>
          <input type="checkbox" name="reason" value="slowUpload" />
          동영상 업로드 속도가 느려요
        </label>

        <label>
          <input type="checkbox" name="reason" value="unstableService" />
          서비스가 불안정해요
        </label>

        <label>
          <input type="checkbox" name="reason" value="newAccount" />새 계정을
          만들고 싶어요
        </label>

        <label>
          <input type="checkbox" name="reason" value="notUsing" />잘 사용하지
          않아요
        </label>

        <label>
          <input type="checkbox" name="reason" value="designIssue" />
          디자인이 마음에 안들어요
        </label>
      </div>

      <h3>구체적인 이유가 있다면 알려주세요</h3>
      <textarea />
      <label htmlFor="deleteCheckbox" className={cn('agreeCheck')}>
        <input type="checkbox" id="deleteCheckbox" />
        <span>안내사항을 모두 확인했으며 동의했습니다.</span>
      </label>
      <CommonButton type="submit" name="탈퇴하기" />
    </form>
  );
};

export default DeleteAccountForm;
