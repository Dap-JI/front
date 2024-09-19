import classNames from 'classnames/bind';
import styles from './holdColorList.module.scss';
import HolderColor from '@/src/components/climbListDetailPage/holdColor';
import { useState } from 'react';
import { RightArrowIcon } from '@/public/icon';

const cn = classNames.bind(styles);

type HoldColorListProps = {
  activeColor?: string | null;
  setActiveColor: React.Dispatch<React.SetStateAction<string | null>>;
  type: 'submit' | 'list';
};

const HoldColorList = ({
  activeColor,
  setActiveColor,
  type,
}: HoldColorListProps) => {
  // 빨, 주, 노, 초, 파, 남, 보, 흰, 회, 검, 분, 갈
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

  // 박스를 보여줄지 여부를 관리하는 상태
  const [isBoxVisible, setIsBoxVisible] = useState(false);

  const activeClick = (color: string) => {
    setActiveColor((prev: string | null) => (prev === color ? null : color));
  };

  // 박스 보이기 상태 토글
  const toggleBoxVisibility = () => {
    setIsBoxVisible(!isBoxVisible);
  };
  const renderColors = () => (
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
  );

  return (
    <div className={cn('outerContainer')}>
      {type === 'submit' ? (
        renderColors()
      ) : (
        <>
          {!isBoxVisible && (
            <button
              onClick={toggleBoxVisibility}
              className={cn('toggleButton')}
            >
              여기를 탭해서 난이도별 답지를 확인하세요!
              <RightArrowIcon
                width="15"
                height="15"
                className={cn('rightIcon')}
              />
            </button>
          )}
          {isBoxVisible && (
            <div className={cn('innerContainer')}>
              <button
                onClick={toggleBoxVisibility}
                className={cn('closeButton')}
              >
                닫기
              </button>
              {renderColors()}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HoldColorList;
