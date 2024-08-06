import styles from './AdminClimbListDatas.module.scss';
import classNames from 'classnames/bind';
import { GymsType } from '@/src/utils/type';
import Image from 'next/image';
import { DeleteIcon, EditIcon } from '@/public/icon';
import { useClimbListDatasDelete } from '@/src/app/climbList/api';

const cn = classNames.bind(styles);

type CardListProps = {
  list: GymsType;
};

const AdminClimbList = ({ list }: CardListProps) => {
  const { logo, name, gym_idx } = list;

  const { mutate: ClimbListDatasDelete } = useClimbListDatasDelete(gym_idx);

  const handleDeleteList = () => {
    ClimbListDatasDelete();
  };

  return (
    <li className={cn('innercontainer')}>
      <div className={cn('image')}>
        <Image
          src={logo || '/icon/icon.png'}
          alt="로고이미지"
          width={60}
          height={60}
          priority
          className={cn('image')}
        />
      </div>
      <span>{name}</span>
      <div className={cn('actionBtn')}>
        <EditIcon />
        <DeleteIcon onClick={handleDeleteList} />
      </div>
    </li>
  );
};

type AdminClimbListDatasProps = {
  lists: GymsType[];
};

const AdminClimbListDatas = ({ lists }: AdminClimbListDatasProps) => {
  return (
    <div className={cn('Outercontainer')}>
      {lists.map((list: GymsType) => (
        <AdminClimbList key={list.gym_idx} list={list} />
      ))}
    </div>
  );
};

export default AdminClimbListDatas;
