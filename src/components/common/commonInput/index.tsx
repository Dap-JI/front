import styles from './commonInput.module.scss';
import classNames from 'classnames/bind';
import { UseFormRegisterReturn } from 'react-hook-form';

const cn = classNames.bind(styles);

type inputProps = {
  placeholder: string;
  label?: string;
  id?: string;
  register?: UseFormRegisterReturn;
  suffix?: React.ReactNode;
};

const CommonInput = ({
  placeholder,
  label,
  id,
  suffix,
  register,
  ...rest
}: inputProps) => {
  return (
    <div className={cn('container')}>
      <label htmlFor={id}>{label}</label>
      <input
        className={cn('input')}
        id={id}
        placeholder={placeholder}
        {...register}
        {...rest}
      />
      {suffix}
    </div>
  );
};

export default CommonInput;
