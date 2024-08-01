import classNames from 'classnames/bind';
import styles from './holdColorList.module.scss';
import HolderColor from '@/src/components/climbListDetailPage/holdColor';
import { useState } from 'react';

const cn = classNames.bind(styles);

type HoldColorListProps = {
  activeColor?: string | null;
  setActiveColor: React.Dispatch<React.SetStateAction<string | null>>;
};

const HoldColorList = ({ activeColor, setActiveColor }: HoldColorListProps) => {
  //빨, 주,노,초,파,남,보,흰,회,검,분,갈
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
    'brown',
  ];

  const activeClick = (color: string) => {
    setActiveColor((prev: string | null) => (prev === color ? null : color));
  };
  //이전 클릭했던 값이 color이면 null로 바꾸고 아니면 color선택

  return (
    <div className={cn('outerContainer')}>
      <div className={cn('innerContainer')}>
        {colors.map((color: string, index: number) => (
          <HolderColor
            key={index}
            color={color}
            active={color === activeColor}
            onClick={() => activeClick(color)}
          />
        ))}
      </div>
    </div>
  );
};

export default HoldColorList;
