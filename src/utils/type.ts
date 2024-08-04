//메타타입
export type metaType = {
  page: number;
  take: number;
  totalCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

//클라밍장 리스트 데이터

export type ClimbLIstType = {
  gym_idx?: number;
  name: string;
  address?: string;
  logo: string;
  notice?: string | null;
};

//클라이밍장 리스트중 상세 데이터

export type UserType = {
  nickname: string;
};

export type DetailType = {
  post_idx: number;
  user_idx: number;
  gym_idx: number;
  clearday: any;
  content: string | null;
  media: string;
  color: string;
  User: UserType;
  createdAt: any;
};

export type ClimbDetailResponseType = {
  gym_name: string; // 체육관 이름
  posts: DetailType[]; // 게시물 목록
  meta: metaType;
  length?: number;
};

// DetailMainContentProps 타입
export type DetailMainContentProps = {
  list: DetailType;
};

// DetailMainContentListProps 타입
export type DetailMainContentListProps = {
  lists: DetailType[];
};

//디테일 업로드 폼 타입
export type useFormPostUploadProps = {
  clearday: string;
  content: string;
  media: string | null;
  color: string | null;
  gym_idx: string | number;
  thumbnailUrl: string | null;
};

//프로필 타입들

export type ProfilePostType = {
  post_idx: number;
  thumbnailUrl: string | null;
};

export type ProfileUserType = {
  nickname: string;
  img: string;
  introduce: string | null;
  provider: string;
};

export type ProfileType = {
  user: ProfileUserType;
  posts: ProfilePostType[];
};

//프로필 수정 폼
export type useFormProfileEditProps = {
  nickname: string;
  introduce: string;
};
