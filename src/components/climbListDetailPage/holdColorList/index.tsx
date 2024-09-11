import classNames from 'classnames/bind';
import styles from './holdColorList.module.scss';
import HolderColor from '@/src/components/climbListDetailPage/holdColor';
import { useState } from 'react';
import { RightArrowIcon } from '@/public/icon';

const cn = classNames.bind(styles);

type HoldColorListProps = {
  activeColor?: string | null;
  setActiveColor: React.Dispatch<React.SetStateAction<string | null>>;
};

const HoldColorList = ({ activeColor, setActiveColor }: HoldColorListProps) => {
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

  return (
    <div className={cn('outerContainer')}>
      {/* 박스를 열기 위한 버튼 */}
      {!isBoxVisible && (
        <button onClick={toggleBoxVisibility} className={cn('toggleButton')}>
          여기를 탭해서 난이도별 답지를 확인하세요!
        </button>
      )}

      {/* 박스가 보여질 때 */}
      {isBoxVisible && (
        <div className={cn('innerContainer')}>
          {/* 가장 왼쪽에 박스 닫기 버튼 추가 */}
          <button onClick={toggleBoxVisibility} className={cn('closeButton')}>
            닫기
          </button>

          {/* 동그라미 색상 리스트 */}
          {colors.map((color: string, index: number) => (
            <HolderColor
              key={index}
              color={color}
              active={color === activeColor}
              onClick={() => activeClick(color)}
            />
          ))}
        </div>
      )}
      <RightArrowIcon width="15" height="15" />
    </div>
  );
};

export default HoldColorList;
