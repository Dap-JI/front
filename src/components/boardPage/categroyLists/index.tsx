import classNames from 'classnames/bind';
import styles from './categoryLists.module.scss';
import { CategroyListType } from '@/src/utils/type';

const cn = classNames.bind(styles);

type CategoryListProps = {
  list: CategroyListType;
  onClick: () => void;
  isSelected: boolean;
};

const CategoryList = ({ list, onClick, isSelected }: CategoryListProps) => {
  const { category } = list;

  return (
    <li className={cn('category', { select: isSelected })} onClick={onClick}>
      {category}
    </li>
  );
};

type CategoryListsProps = {
  lists: CategroyListType[];
  selectCategory: string | null;
  onCategorySelect: (category: string) => void;
};

const CategoryLists = ({
  lists,
  selectCategory,
  onCategorySelect,
}: CategoryListsProps) => {
  return (
    <div className={cn('outerContainer')}>
      {lists.map((list) => (
        <CategoryList
          key={list.category_idx}
          list={list}
          isSelected={list.category === selectCategory}
          onClick={() => onCategorySelect(list.category)}
        />
      ))}
    </div>
  );
};

export default CategoryLists;
