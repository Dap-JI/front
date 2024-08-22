import { title } from 'process';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export const climbLists = [
  {
    gym_idx: 1,
    name: '락랜드',
    adress: '서울특별시 강북구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcCa4na%2FbtsIMxBjSX8%2Fmy6IojkItzLjKZ1WoWAIzK%2Fimg.jpg',
    notice: '8월 30일부터 다음셋팅입니다',
  },
  {
    gym_idx: 2,
    name: '클라이밍월드',
    adress: '서울특별시 종로구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FYptzI%2FbtsIMCWFQ9C%2FA38QkNnQQ1KePj7K0ZtWz0%2Fimg.jpg',
    notice: null,
  },
  {
    gym_idx: 3,
    name: '볼더파크',
    adress: '서울특별시 용산구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FwLygU%2FbtsINu4VkwW%2FWdNfcOvdzGXNIiOmq1qIpk%2Fimg.jpg',
    notice: '9월 5일 신규 루트 세팅 예정',
  },
  {
    gym_idx: 4,
    name: '클라임존',
    adress: '서울특별시 서대문구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F8t6sg%2FbtsIOoJCGoE%2FVoXB0BL7tKW7N0NOUXXtGK%2Fimg.jpg',
    notice: null,
  },
  {
    gym_idx: 5,
    name: '알피니스트',
    adress: '서울특별시 강남구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrpH7d%2FbtsIMFlyHDh%2FTnaklhHTWwWevnmrDRvPjk%2Fimg.jpg',
    notice: '10월 1일부터 대회 준비로 인해 일시 휴업',
  },
  {
    gym_idx: 6,
    name: '클라임스페이스',
    adress: '서울특별시 마포구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrpH7d%2FbtsIMFlyHDh%2FTnaklhHTWwWevnmrDRvPjk%2Fimg.jpg',
    notice: null,
  },
  {
    gym_idx: 7,
    name: '볼더랜드',
    adress: '서울특별시 성북구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrpH7d%2FbtsIMFlyHDh%2FTnaklhHTWwWevnmrDRvPjk%2Fimg.jpg',
    notice: '8월 25일 새로운 회원 모집',
  },
  {
    gym_idx: 8,
    name: '클라이머즈',
    adress: '서울특별시 은평구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrpH7d%2FbtsIMFlyHDh%2FTnaklhHTWwWevnmrDRvPjk%2Fimg.jpg',
    notice: null,
  },
  {
    gym_idx: 9,
    name: '클라이밍하우스',
    adress: '서울특별시 강서구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrpH7d%2FbtsIMFlyHDh%2FTnaklhHTWwWevnmrDRvPjk%2Fimg.jpg',
    notice: '9월 10일 이벤트 공지 예정',
  },
  {
    gym_idx: 10,
    name: '락하우스',
    adress: '서울특별시 동대문구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrpH7d%2FbtsIMFlyHDh%2FTnaklhHTWwWevnmrDRvPjk%2Fimg.jpg',
    notice: null,
  },
  {
    gym_idx: 11,
    name: '클라이밍아레나',
    adress: '서울특별시 중랑구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrpH7d%2FbtsIMFlyHDh%2FTnaklhHTWwWevnmrDRvPjk%2Fimg.jpg',
    notice: '8월 20일부터 신규 루트 오픈',
  },
  {
    gym_idx: 12,
    name: '클라임파크',
    adress: '서울특별시 노원구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrpH7d%2FbtsIMFlyHDh%2FTnaklhHTWwWevnmrDRvPjk%2Fimg.jpg',
    notice: null,
  },
  {
    gym_idx: 13,
    name: '볼더짐',
    adress: '서울특별시 구로구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrpH7d%2FbtsIMFlyHDh%2FTnaklhHTWwWevnmrDRvPjk%2Fimg.jpg',
    notice: '9월 1일 클라이밍 강좌 개설',
  },
  {
    gym_idx: 14,
    name: '클라이밍랜드',
    adress: '서울특별시 금천구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrpH7d%2FbtsIMFlyHDh%2FTnaklhHTWwWevnmrDRvPjk%2Fimg.jpg',
    notice: null,
  },
  {
    gym_idx: 15,
    name: '클라임업',
    adress: '서울특별시 영등포구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrpH7d%2FbtsIMFlyHDh%2FTnaklhHTWwWevnmrDRvPjk%2Fimg.jpg',
    notice: '10월 5일부터 운영 시간 변경',
  },
  {
    gym_idx: 16,
    name: '볼더클럽',
    adress: '서울특별시 양천구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrpH7d%2FbtsIMFlyHDh%2FTnaklhHTWwWevnmrDRvPjk%2Fimg.jpg',
    notice: null,
  },
  {
    gym_idx: 17,
    name: '클라이밍펀',
    adress: '서울특별시 도봉구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrpH7d%2FbtsIMFlyHDh%2FTnaklhHTWwWevnmrDRvPjk%2Fimg.jpg',
    notice: '8월 15일 회원 이벤트',
  },
  {
    gym_idx: 18,
    name: '락펀',
    adress: '서울특별시 동작구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrpH7d%2FbtsIMFlyHDh%2FTnaklhHTWwWevnmrDRvPjk%2Fimg.jpg',
    notice: null,
  },
  {
    gym_idx: 19,
    name: '클라임아카데미',
    adress: '서울특별시 관악구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrpH7d%2FbtsIMFlyHDh%2FTnaklhHTWwWevnmrDRvPjk%2Fimg.jpg',
    notice: '9월 20일부터 강습 시작',
  },
  {
    gym_idx: 20,
    name: '클라임챌린지',
    adress: '서울특별시 서초구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrpH7d%2FbtsIMFlyHDh%2FTnaklhHTWwWevnmrDRvPjk%2Fimg.jpg',
    notice: null,
  },
  {
    gym_idx: 21,
    name: '클라임챌린지',
    adress: '서울특별시 서초구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrpH7d%2FbtsIMFlyHDh%2FTnaklhHTWwWevnmrDRvPjk%2Fimg.jpg',
    notice: null,
  },
  {
    gym_idx: 22,
    name: '클라임챌린지',
    adress: '서울특별시 서초구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrpH7d%2FbtsIMFlyHDh%2FTnaklhHTWwWevnmrDRvPjk%2Fimg.jpg',
    notice: null,
  },
  {
    gym_idx: 23,
    name: '클라임챌린지',
    adress: '서울특별시 서초구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrpH7d%2FbtsIMFlyHDh%2FTnaklhHTWwWevnmrDRvPjk%2Fimg.jpg',
    notice: null,
  },
  {
    gym_idx: 24,
    name: '클라임챌린지',
    adress: '서울특별시 서초구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrpH7d%2FbtsIMFlyHDh%2FTnaklhHTWwWevnmrDRvPjk%2Fimg.jpg',
    notice: null,
  },
  {
    gym_idx: 25,
    name: '클라임챌린지',
    adress: '서울특별시 서초구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrpH7d%2FbtsIMFlyHDh%2FTnaklhHTWwWevnmrDRvPjk%2Fimg.jpg',
    notice: null,
  },
  {
    gym_idx: 26,
    name: '클라임챌린지',
    adress: '서울특별시 서초구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrpH7d%2FbtsIMFlyHDh%2FTnaklhHTWwWevnmrDRvPjk%2Fimg.jpg',
    notice: null,
  },
  {
    gym_idx: 27,
    name: '클라임챌린지',
    adress: '서울특별시 서초구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrpH7d%2FbtsIMFlyHDh%2FTnaklhHTWwWevnmrDRvPjk%2Fimg.jpg',
    notice: null,
  },
  {
    gym_idx: 28,
    name: '클라임챌린지',
    adress: '서울특별시 서초구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrpH7d%2FbtsIMFlyHDh%2FTnaklhHTWwWevnmrDRvPjk%2Fimg.jpg',
    notice: null,
  },
  {
    gym_idx: 29,
    name: '클라임챌린지',
    adress: '서울특별시 서초구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrpH7d%2FbtsIMFlyHDh%2FTnaklhHTWwWevnmrDRvPjk%2Fimg.jpg',
    notice: null,
  },
  {
    gym_idx: 230,
    name: '클라임챌린지',
    adress: '서울특별시 서초구 ',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrpH7d%2FbtsIMFlyHDh%2FTnaklhHTWwWevnmrDRvPjk%2Fimg.jpg',
    notice: null,
  },
];

export const contentDetailData = [
  {
    post_idx: '1',
    user_idx: 1,
    gym_idx: 2,
    clearday: '2024-07-01',
    content:
      '오늘 성공했어요 1오늘 성공했어요 1오늘 성공했어요 1오늘 성공했어요 1오늘 성공했어요 1오늘 성공했어요 1오늘 성공했어요 1오늘 성공했어요 1오늘 성공했어요 1오늘 성공했어요 1오늘 성공했어요 1오늘 성공했어요 1',
    media: 'www.example1.com',
    color: 'red',
    username: '박지용',
    created_at: '2024-07-01 00:00:00',
  },
  {
    post_idx: '2',
    user_idx: 2,
    gym_idx: 3,
    clearday: '2024-07-02',
    content: '오늘 성공했어요 2',
    media: 'www.example2.com',
    color: 'blue',
    username: '박지용',
    created_at: '2024-07-02 00:00:00',
  },
  {
    post_idx: '3',
    user_idx: 3,
    gym_idx: 1,
    clearday: '2024-07-03',
    content: '오늘 성공했어요 3',
    media: 'www.example3.com',
    color: 'green',
    username: '박지용',
    created_at: '2024-07-03 00:00:00',
  },
  {
    post_idx: '4',
    user_idx: 4,
    gym_idx: 4,
    clearday: '2024-07-04',
    content: '오늘 성공했어요 4',
    media: 'www.example4.com',
    color: 'yellow',
    username: '박지용',
    created_at: '2024-07-04 00:00:00',
  },
  {
    post_idx: '5',
    user_idx: 5,
    gym_idx: 5,
    clearday: '2024-07-05',
    content: '오늘 성공했어요 5',
    media: 'www.example5.com',
    color: 'pink',
    username: '박지용',
    created_at: '2024-07-05 00:00:00',
  },
  {
    post_idx: '6',
    user_idx: 6,
    gym_idx: 6,
    clearday: '2024-07-06',
    content: '오늘 성공했어요 6',
    media: 'www.example6.com',
    color: 'purple',
    username: '박지용',
    created_at: '2024-07-06 00:00:00',
  },
  {
    post_idx: '7',
    user_idx: 7,
    gym_idx: 7,
    clearday: '2024-07-07',
    content: '오늘 성공했어요 7',
    media: 'www.example7.com',
    color: 'white',
    username: '박지용',
    created_at: '2024-07-07 00:00:00',
  },
  {
    post_idx: '8',
    user_idx: 8,
    gym_idx: 8,
    clearday: '2024-07-08',
    content: '오늘 성공했어요 8',
    media: 'www.example8.com',
    color: 'gray',
    username: '박지용',
    created_at: '2024-07-08 00:00:00',
  },
  {
    post_idx: '9',
    user_idx: 9,
    gym_idx: 9,
    clearday: '2024-07-09',
    content: '오늘 성공했어요 9',
    media: 'www.example9.com',
    color: 'black',
    username: '박지용',
    created_at: '2024-07-09 00:00:00',
  },
  {
    post_idx: '10',
    user_idx: 10,
    gym_idx: 10,
    clearday: '2024-07-10',
    content: '오늘 성공했어요 10',
    media: 'www.example10.com',
    color: 'white',
    username: '박지용',
    created_at: '2024-07-10 00:00:00',
  },
  //   {
  //     post_idx: '11',
  //     user_idx: 1,
  //     gym_idx: 2,
  //     clearday: '2024-07-11',
  //     content: '오늘 성공했어요 11',
  //     media: 'www.example11.com',
  //     color: 'blue',
  // username:'박지용',
  // created_at: '2024-07-11 00:00:00'
  //   },
  //   {
  //     post_idx: '12',
  //     user_idx: 2,
  //     gym_idx: 3,
  //     clearday: '2024-07-12',
  //     content: '오늘 성공했어요 12',
  //     media: 'www.example12.com',
  //     color: 'pink',
  // username:'박지용',
  // created_at: '2024-07-12 00:00:00'
  //   },
  //   {
  //     post_idx: '13',
  //     user_idx: 3,
  //     gym_idx: 4,
  //     clearday: '2024-07-13',
  //     content: '오늘 성공했어요 13',
  //     media: 'www.example13.com',
  //     color: 'pink',
  // username:'박지용',
  // created_at: '2024-07-13 00:00:00'
  //   },
  //   {
  //     post_idx: '14',
  //     user_idx: 4,
  //     gym_idx: 5,
  //     clearday: '2024-07-14',
  //     content: '오늘 성공했어요 14',
  //     media: 'www.example14.com',
  //     color: 'green',
  // username:'박지용',
  // created_at: '2024-07-14 00:00:00'
  //   },
  //   {
  //     post_idx: '15',
  //     user_idx: 5,
  //     gym_idx: 6,
  //     clearday: '2024-07-15',
  //     content: '오늘 성공했어요 15',
  //     media: 'www.example15.com',
  //     color: 'yellow',
  // username:'박지용',
  // created_at: '2024-07-15 00:00:00'
  //   },
  //   {
  //     post_idx: '16',
  //     user_idx: 6,
  //     gym_idx: 7,
  //     clearday: '2024-07-16',
  //     content: '오늘 성공했어요 16',
  //     media: 'www.example16.com',
  //     color: 'purple',
  // username:'박지용',
  // created_at: '2024-07-16 00:00:00'
  //   },
  //   {
  //     post_idx: '17',
  //     user_idx: 7,
  //     gym_idx: 8,
  //     clearday: '2024-07-17',
  //     content: '오늘 성공했어요 17',
  //     media: 'www.example17.com',
  //     color: 'gray',
  // username:'박지용',
  // created_at: '2024-07-17 00:00:00'
  //   },
  //   {
  //     post_idx: '18',
  //     user_idx: 8,
  //     gym_idx: 9,
  //     clearday: '2024-07-18',
  //     content: '오늘 성공했어요 18',
  //     media: 'www.example18.com',
  //     color: 'black',
  // username:'박지용',
  // created_at: '2024-07-18 00:00:00'
  //   },
  //   {
  //     post_idx: '19',
  //     user_idx: 9,
  //     gym_idx: 10,
  //     clearday: '2024-07-19',
  //     content: '오늘 성공했어요 19',
  //     media: 'www.example19.com',
  //     color: 'white',
  // username:'박지용',
  // created_at: '2024-07-19 00:00:00'
  //   },
  //   {
  //     post_idx: '20',
  //     user_idx: 10,
  //     gym_idx: 1,
  //     clearday: '2024-07-20',
  //     content: '오늘 성공했어요 20',
  //     media: 'www.example20.com',
  //     color: 'indigo',
  // username:'박지용',
  // created_at: '2024-07-20 00:00:00'
  //   }
];

export const BoardDatas = [
  {
    board_idx: 1,
    user_idx: 5,
    title: '이거 진짜 진짜 좋음 왜냐하면',
    category: '장비',
    username: '박지용',
    created_at: '2024-07-30T02:48:05.000Z',
  },
  {
    board_idx: 2,
    user_idx: 2,
    title: '이 제품 완전 추천합니다',
    category: '용품',
    username: '김민수',
    created_at: '2024-07-30T02:48:05.000Z',
  },
  {
    board_idx: 3,
    user_idx: 3,
    title: '정말 편리한 아이템이에요',
    category: '기타',
    username: '이서연',
    created_at: '2024-07-30T02:48:05.000Z',
  },
  {
    board_idx: 4,
    user_idx: 4,
    title: '효율이 정말 좋습니다',
    category: '장비',
    username: '최재혁',
    created_at: '2024-07-30T02:48:05.000Z',
  },
  {
    board_idx: 5,
    user_idx: 1,
    title: '강력 추천하는 아이템',
    category: '용품',
    username: '박서준',
    created_at: '2024-07-30T02:48:05.000Z',
  },
  {
    board_idx: 6,
    user_idx: 6,
    title: '정말 유용한 제품입니다',
    category: '기타',
    username: '김지수',
    created_at: '2024-07-30T02:48:05.000Z',
  },
  {
    board_idx: 7,
    user_idx: 7,
    title: '쓰고나서 만족도가 높아요',
    category: '장비',
    username: '장예은',
    created_at: '2024-07-30T02:48:05.000Z',
  },
  {
    board_idx: 8,
    user_idx: 8,
    title: '다른 사람에게도 추천합니다',
    category: '용품',
    username: '윤하준',
    created_at: '2024-07-30T02:48:05.000Z',
  },
  {
    board_idx: 9,
    user_idx: 9,
    title: '기대 이상으로 좋습니다',
    category: '기타',
    username: '서지훈',
    created_at: '2024-07-30T02:48:05.000Z',
  },
  {
    board_idx: 10,
    user_idx: 10,
    title: '다시 사고 싶은 제품입니다',
    category: '장비',
    username: '한예지',
    created_at: '2024-07-30T02:48:05.000Z',
  },
];

export const PostDatas = [
  {
    thumbnail_idx: 1,
    thumbnail:
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fc2ylrC%2FbtsIN5ctoTf%2FS8UYJxhMxoQfuN3YjSBiik%2Fimg.jpg',
  },
  {
    thumbnail_idx: 2,
    thumbnail:
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fc2ylrC%2FbtsIN5ctoTf%2FS8UYJxhMxoQfuN3YjSBiik%2Fimg.jpg',
  },
  {
    thumbnail_idx: 3,
    thumbnail:
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fc2ylrC%2FbtsIN5ctoTf%2FS8UYJxhMxoQfuN3YjSBiik%2Fimg.jpg',
  },
  {
    thumbnail_idx: 4,
    thumbnail:
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fc2ylrC%2FbtsIN5ctoTf%2FS8UYJxhMxoQfuN3YjSBiik%2Fimg.jpg',
  },
  {
    thumbnail_idx: 5,
    thumbnail:
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fc2ylrC%2FbtsIN5ctoTf%2FS8UYJxhMxoQfuN3YjSBiik%2Fimg.jpg',
  },
  {
    thumbnail_idx: 6,
    thumbnail:
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fc2ylrC%2FbtsIN5ctoTf%2FS8UYJxhMxoQfuN3YjSBiik%2Fimg.jpg',
  },
  {
    thumbnail_idx: 7,
    thumbnail:
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fc2ylrC%2FbtsIN5ctoTf%2FS8UYJxhMxoQfuN3YjSBiik%2Fimg.jpg',
  },
  {
    thumbnail_idx: 8,
    thumbnail:
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fc2ylrC%2FbtsIN5ctoTf%2FS8UYJxhMxoQfuN3YjSBiik%2Fimg.jpg',
  },
  {
    thumbnail_idx: 9,
    thumbnail:
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fc2ylrC%2FbtsIN5ctoTf%2FS8UYJxhMxoQfuN3YjSBiik%2Fimg.jpg',
  },
  {
    thumbnail_idx: 10,
    thumbnail:
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fc2ylrC%2FbtsIN5ctoTf%2FS8UYJxhMxoQfuN3YjSBiik%2Fimg.jpg',
  },
  {
    thumbnail_idx: 11,
    thumbnail:
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fc2ylrC%2FbtsIN5ctoTf%2FS8UYJxhMxoQfuN3YjSBiik%2Fimg.jpg',
  },
];

export const categoryListData = [
  { category_idx: 1, category: '전체' },
  { category_idx: 2, category: '장비' },
  { category_idx: 3, category: '부상및치료' },
  { category_idx: 4, category: '암장 리뷰' },
  { category_idx: 5, category: '잡담' },
];

export type metaType = {
  page: number;
  take: number;
  totalCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type UserType = {
  nickname: string;
  img: string;
};

export type LinkPreviewType = {
  title: string | null;
  img: string | null;
  link?: string | null;
};

export type BoardListDataType = {
  board_idx: number;
  user_idx: number;
  user: UserType;
  category: string;
  create_At: any;
  likeCount: number;
  commentCount: number;
  boardImg: string[];
  title: string;
  content: string;
  linkPreview?: LinkPreviewType;
};

export type BoardResponseType = {
  boards: BoardListDataType[];
  meta: metaType;
};

export const boardListData = {
  boards: [
    {
      board_idx: 1,
      user_idx: 1,
      user: {
        nickname: '지이용',
        img: 'https://dapji.s3.ap-northeast-2.amazonaws.com/profile-pictures/1723018625125-%C3%AB%C2%A7%C2%9D%C3%AB%C2%82%C2%98%C3%AB%C2%87%C2%BD2.jpg',
      },
      category: '장비',
      create_At: '2024-07-21T13:00:00.000Z',
      likeCount: 10,
      commentCount: 15,
      boardImg: [
        'https://dapji.s3.ap-northeast-2.amazonaws.com/profile-pictures/1723018625125-%C3%AB%C2%A7%C2%9D%C3%AB%C2%82%C2%98%C3%AB%C2%87%C2%BD2.jpg',
        'https://dapji.s3.ap-northeast-2.amazonaws.com/profile-pictures/1723018625125-%C3%AB%C2%A7%C2%9D%C3%AB%C2%82%C2%98%C3%AB%C2%87%C2%BD2.jpg',
      ],
      title: '여러분 답지를 사용하는게 얼마나 이득이냐면요',
      content:
        '20일 정부와 의료계 등에 따르면 코로나19 입원환자는 7월 둘째 주 148명에서 이달 둘째 주 1천359명으로 9배로 불었다.방역 당국은 이달 말까지 코로나19 유행 속도가 빨라질 가능성이 큰 것으로 본다.홍정익 질병관리청 코로나19 대책반 상황대응단장은 전날 "지금 환자 수는 작년 8월의 절반 수준이지만, 최근 2년간의 여름철 유행 동향과 추세를 분석했을 때 월말에는 작년 최고 유행 수준인 주당 35만명까지 갈 수 있다"고 예상했다.',

      linkPreview: {
        title:
          '네이버 매출 구글 턱밑까지 쫓아왔다! 글로벌 기업 1위 네이버의 근황',
        img: 'https://dapji.s3.ap-northeast-2.amazonaws.com/profile-pictures/1723018625125-%C3%AB%C2%A7%C2%9D%C3%AB%C2%82%C2%98%C3%AB%C2%87%C2%BD2.jpg',
        link: 'https://www.naver.com',
      },
    },
    {
      board_idx: 2,
      user_idx: 2,
      user: {
        nickname: '디옹',
        img: 'https://dapji.s3.ap-northeast-2.amazonaws.com/profile-pictures/1723018625125-%C3%AB%C2%A7%C2%9D%C3%AB%C2%82%C2%98%C3%AB%C2%87%C2%BD2.jpg',
      },
      category: '부상',
      create_At: '2024-08-15T11:33:41.000Z',
      likeCount: 8,
      commentCount: 30,
      boardImg: [
        'https://dapji.s3.ap-northeast-2.amazonaws.com/profile-pictures/1723018625125-%C3%AB%C2%A7%C2%9D%C3%AB%C2%82%C2%98%C3%AB%C2%87%C2%BD2.jpg',
        'https://dapji.s3.ap-northeast-2.amazonaws.com/profile-pictures/1723018625125-%C3%AB%C2%A7%C2%9D%C3%AB%C2%82%C2%98%C3%AB%C2%87%C2%BD2.jpg',
        'https://dapji.s3.ap-northeast-2.amazonaws.com/profile-pictures/1723018625125-%C3%AB%C2%A7%C2%9D%C3%AB%C2%82%C2%98%C3%AB%C2%87%C2%BD2.jpg',
      ],
      title: '여러분 답지를 사용하는게 얼마나 이득이냐면요',
      content:
        '20일 정부와 의료계 등에 따르면 코로나19 입원환자는 7월 둘째 주 148명에서 이달 둘째 주 1천359명으로 9배로 불었다.방역 당국은 이달 말까지 코로나19 유행 속도가 빨라질 가능성이 큰 것으로 본다.홍정익 질병관리청 코로나19 대책반 상황대응단장은 전날 "지금 환자 수는 작년 8월의 절반 수준이지만, 최근 2년간의 여름철 유행 동향과 추세를 분석했을 때 월말에는 작년 최고 유행 수준인 주당 35만명까지 갈 수 있다"고 예상했다.',
      linkPreview: {
        title: null,
        img: null,
        link: null,
      },
    },
    {
      board_idx: 3,
      user_idx: 3,
      user: {
        nickname: '디옹',
        img: 'https://dapji.s3.ap-northeast-2.amazonaws.com/profile-pictures/1723018625125-%C3%AB%C2%A7%C2%9D%C3%AB%C2%82%C2%98%C3%AB%C2%87%C2%BD2.jpg',
      },
      category: '잡담',
      create_At: '2024-08-15T11:33:41.000Z',
      likeCount: 20,
      commentCount: 5,
      boardImg: [],
      title: '한혜진, 엄마가 반대한 연인 있었다엄마가 반대한 연인 있었다(연참)',
      content:
        '20일 정부와 의료계 등에 따르면 코로나19 입원환자는 7월 둘째 주 148명에서 이달 둘째 주 1천359명으로 9배로 불었다.방역 당국은 이달 말까지 코로나19 유행 속도가 빨라질 가능성이 큰 것으로 본다.홍정익 질병관리청 코로나19 대책반 상황대응단장은 전날 "지금 환자 수는 작년 8월의 절반 수준이지만, 최근 2년간의 여름철 유행 동향과 추세를 분석했을 때 월말에는 작년 최고 유행 수준인 주당 35만명까지 갈 수 있다"고 예상했다.',
      linkPreview: {
        title: null,
        img: null,
        link: null,
      },
    },
    {
      board_idx: 4,
      user_idx: 4,
      user: {
        nickname: '디옹',
        img: 'https://dapji.s3.ap-northeast-2.amazonaws.com/profile-pictures/1723018625125-%C3%AB%C2%A7%C2%9D%C3%AB%C2%82%C2%98%C3%AB%C2%87%C2%BD2.jpg',
      },
      category: '잡담',
      create_At: '2024-08-15T11:33:41.000Z',
      likeCount: 20,
      commentCount: 5,
      boardImg: [],
      title: '한혜진, 엄마가 반대한 연인 있었다엄마가 반대한 연인 있었다(연참)',
      content:
        '20일 정부와 의료계 등에 따르면 코로나19 입원환자는 7월 둘째 주 148명에서 이달 둘째 주 1천359명으로 9배로 불었다.방역 당국은 이달 말까지 코로나19 유행 속도가 빨라질 가능성이 큰 것으로 본다.홍정익 질병관리청 코로나19 대책반 상황대응단장은 전날 "지금 환자 수는 작년 8월의 절반 수준이지만, 최근 2년간의 여름철 유행 동향과 추세를 분석했을 때 월말에는 작년 최고 유행 수준인 주당 35만명까지 갈 수 있다"고 예상했다.',
      linkPreview: {
        title: null,
        img: null,
        link: null,
      },
    },
    {
      board_idx: 5,
      user_idx: 5,
      user: {
        nickname: '디옹',
        img: 'https://dapji.s3.ap-northeast-2.amazonaws.com/profile-pictures/1723018625125-%C3%AB%C2%A7%C2%9D%C3%AB%C2%82%C2%98%C3%AB%C2%87%C2%BD2.jpg',
      },
      category: '잡담',
      create_At: '2024-08-15T11:33:41.000Z',
      likeCount: 20,
      commentCount: 5,
      boardImg: [],
      title: '한혜진, 엄마가 반대한 연인 있었다엄마가 반대한 연인 있었다(연참)',
      content:
        '20일 정부와 의료계 등에 따르면 코로나19 입원환자는 7월 둘째 주 148명에서 이달 둘째 주 1천359명으로 9배로 불었다.방역 당국은 이달 말까지 코로나19 유행 속도가 빨라질 가능성이 큰 것으로 본다.홍정익 질병관리청 코로나19 대책반 상황대응단장은 전날 "지금 환자 수는 작년 8월의 절반 수준이지만, 최근 2년간의 여름철 유행 동향과 추세를 분석했을 때 월말에는 작년 최고 유행 수준인 주당 35만명까지 갈 수 있다"고 예상했다.',
      linkPreview: {
        title: null,
        img: null,
        link: null,
      },
    },
    {
      board_idx: 6,
      user_idx: 6,
      user: {
        nickname: '디옹',
        img: 'https://dapji.s3.ap-northeast-2.amazonaws.com/profile-pictures/1723018625125-%C3%AB%C2%A7%C2%9D%C3%AB%C2%82%C2%98%C3%AB%C2%87%C2%BD2.jpg',
      },
      category: '잡담',
      create_At: '2024-08-15T11:33:41.000Z',
      likeCount: 20,
      commentCount: 5,
      boardImg: [],
      title: '한혜진, 엄마가 반대한 연인 있었다엄마가 반대한 연인 있었다(연참)',
      content:
        '20일 정부와 의료계 등에 따르면 코로나19 입원환자는 7월 둘째 주 148명에서 이달 둘째 주 1천359명으로 9배로 불었다.방역 당국은 이달 말까지 코로나19 유행 속도가 빨라질 가능성이 큰 것으로 본다.홍정익 질병관리청 코로나19 대책반 상황대응단장은 전날 "지금 환자 수는 작년 8월의 절반 수준이지만, 최근 2년간의 여름철 유행 동향과 추세를 분석했을 때 월말에는 작년 최고 유행 수준인 주당 35만명까지 갈 수 있다"고 예상했다.',
      linkPreview: {
        title: null,
        img: null,
        link: null,
      },
    },
    {
      board_idx: 7,
      user_idx: 7,
      user: {
        nickname: '디옹',
        img: 'https://dapji.s3.ap-northeast-2.amazonaws.com/profile-pictures/1723018625125-%C3%AB%C2%A7%C2%9D%C3%AB%C2%82%C2%98%C3%AB%C2%87%C2%BD2.jpg',
      },
      category: '잡담',
      create_At: '2024-08-15T11:33:41.000Z',
      likeCount: 20,
      commentCount: 5,
      boardImg: [],
      title: '한혜진, 엄마가 반대한 연인 있었다엄마가 반대한 연인 있었다(연참)',
      content:
        '20일 정부와 의료계 등에 따르면 코로나19 입원환자는 7월 둘째 주 148명에서 이달 둘째 주 1천359명으로 9배로 불었다.방역 당국은 이달 말까지 코로나19 유행 속도가 빨라질 가능성이 큰 것으로 본다.홍정익 질병관리청 코로나19 대책반 상황대응단장은 전날 "지금 환자 수는 작년 8월의 절반 수준이지만, 최근 2년간의 여름철 유행 동향과 추세를 분석했을 때 월말에는 작년 최고 유행 수준인 주당 35만명까지 갈 수 있다"고 예상했다.',
      linkPreview: {
        title: null,
        img: null,
        link: null,
      },
    },
    {
      board_idx: 8,
      user_idx: 8,
      user: {
        nickname: '디옹',
        img: 'https://dapji.s3.ap-northeast-2.amazonaws.com/profile-pictures/1723018625125-%C3%AB%C2%A7%C2%9D%C3%AB%C2%82%C2%98%C3%AB%C2%87%C2%BD2.jpg',
      },
      category: '잡담',
      create_At: '2024-08-15T11:33:41.000Z',
      likeCount: 20,
      commentCount: 5,
      boardImg: [],
      title: '한혜진, 엄마가 반대한 연인 있었다엄마가 반대한 연인 있었다(연참)',
      content:
        '20일 정부와 의료계 등에 따르면 코로나19 입원환자는 7월 둘째 주 148명에서 이달 둘째 주 1천359명으로 9배로 불었다.방역 당국은 이달 말까지 코로나19 유행 속도가 빨라질 가능성이 큰 것으로 본다.홍정익 질병관리청 코로나19 대책반 상황대응단장은 전날 "지금 환자 수는 작년 8월의 절반 수준이지만, 최근 2년간의 여름철 유행 동향과 추세를 분석했을 때 월말에는 작년 최고 유행 수준인 주당 35만명까지 갈 수 있다"고 예상했다.',
      linkPreview: {
        title: null,
        img: null,
        link: null,
      },
    },
    {
      board_idx: 9,
      user_idx: 9,
      user: {
        nickname: '디옹',
        img: 'https://dapji.s3.ap-northeast-2.amazonaws.com/profile-pictures/1723018625125-%C3%AB%C2%A7%C2%9D%C3%AB%C2%82%C2%98%C3%AB%C2%87%C2%BD2.jpg',
      },
      category: '잡담',
      create_At: '2024-08-15T11:33:41.000Z',
      likeCount: 20,
      commentCount: 5,
      boardImg: [],
      title: '한혜진, 엄마가 반대한 연인 있었다엄마가 반대한 연인 있었다(연참)',
      content:
        '20일 정부와 의료계 등에 따르면 코로나19 입원환자는 7월 둘째 주 148명에서 이달 둘째 주 1천359명으로 9배로 불었다.방역 당국은 이달 말까지 코로나19 유행 속도가 빨라질 가능성이 큰 것으로 본다.홍정익 질병관리청 코로나19 대책반 상황대응단장은 전날 "지금 환자 수는 작년 8월의 절반 수준이지만, 최근 2년간의 여름철 유행 동향과 추세를 분석했을 때 월말에는 작년 최고 유행 수준인 주당 35만명까지 갈 수 있다"고 예상했다.',
      linkPreview: {
        title: null,
        img: null,
        link: null,
      },
    },
  ],
  meta: {
    page: 0,
    take: 10,
    totalCount: 3,
    pageCount: 1,
    hasPreviousPage: false,
    hasNextPage: false,
  },
};
