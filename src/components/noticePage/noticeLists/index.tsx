import classNames from 'classnames/bind';
import styles from './noticeLists.module.scss';
const cn = classNames.bind(styles);

type NoticeListProps = {
  list: any;
};

const NoticeList = ({ list }: NoticeListProps) => {
  const { subtitle, contents, links = [] } = list;
  return (
    <div className={cn('container')}>
      <p># {subtitle}</p>
      <ul>
        {contents.map((content: string, index: number) => (
          <li key={index}>{content}</li>
        ))}
      </ul>
      <ul>
        {links.length > 0 && (
          <ul>
            {links.map((link: string, index: number) => (
              <li key={index}>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  🔗{link}
                </a>
              </li>
            ))}
          </ul>
        )}
      </ul>
    </div>
  );
};

type noticeListProps = {
  lists: any;
};

const NoticeLists = ({ lists }: noticeListProps) => {
  return (
    <div>
      {lists.map((list: any, index: number) => (
        <NoticeList key={index} list={list} />
      ))}
    </div>
  );
};

export default NoticeLists;
