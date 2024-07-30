import classNames from 'classnames/bind';
import styles from './holdColorList.module.scss';
import HolderColor from '@/src/components/climbListDetailPage/holdColor';

const cn = classNames.bind(styles);

const HoldColorList = () => {
  //빨, 주,노,초,파,남,보,흰,회,검,분
  const colors = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'indigo',
    'purple',
    'gray',
    'black',
    'white',
    'pink',
  ];
  return (
    <div className={cn('container')}>
      {colors.map((color: string, index: number) => (
        <HolderColor key={index} color={color} />
      ))}
    </div>
  );
};

export default HoldColorList;
