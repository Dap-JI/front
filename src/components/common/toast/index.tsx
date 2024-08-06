'use client';
import classNames from 'classnames/bind';
import styles from './toast.module.scss';

import { CompleteIcon, WarnIcon } from '@/public/icon';
import { useToastStore } from '@/src/utils/store/useToastStore';

const cn = classNames.bind(styles);

const Toast = () => {
  const { text, type, visible } = useToastStore();

  if (!visible) return null;

  return (
    <div className={cn('container')}>
      {type === 'check' ? <CompleteIcon /> : <WarnIcon />}
      <span>{text}</span>
    </div>
  );
};
export default Toast;
