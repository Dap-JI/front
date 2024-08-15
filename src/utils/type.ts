export type LoginUserType = {
  user_idx: number;
  nickname: string | null;
  email: string;
  img: string;
  introduce: string;
  isDelete: boolean;
  createdAt: any;
  provider: string;
  role: string;
};

export type initializeNicknameType = {
  nickname: string;
};

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

export type GymsType = {
  gym_idx: number;
  name: string;
  address?: string;
  logo: string | null;
  notice?: string | null;
};

export type ClimbLIstResponseType = {
  gyms: GymsType[];
  meta: metaType;
};

//클라이밍장 리스트 업로드 폼 타입
export type useFormListUploadProps = {
  logo: any;
  name: string;
  address: string;
  notice: string;
};

//클라이밍장 리스트중 상세 데이터

export type UserType = {
  nickname: string;
  img: string;
};

export type DetailType = {
  post_idx: number;
  user_idx: number;
  gym_idx: number;
  clearday: any;
  media: string[];
  thumbnailUrl: string[];
  content: string | null;
  color: string;
  createdAt: any;
  User: UserType;
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
  content: string | null;
  media: string[];
  color: string | null;
  gym_idx: string | number;
  thumbnailUrl: string[];
};

//프로필 타입들

export type ProfilePostType = {
  post_idx: string;
  thumbnailUrl: any;
  gym_idx: string;
};

export type ProfileUserType = {
  nickname: string;
  img: string;
  introduce: string | null;
  provider: string;
};

export type ProfileType = {
  data: ProfileType;
  user: ProfileUserType;
  posts: ProfilePostType[];
  meta: metaType;
  isOwnProfile: boolean;
  userRole: string;
};

//프로필 수정 폼타입
export type useFormProfileEditProps = {
  nickname: string;
  introduce: string;
};

//포스트 디테일 타입들

export type PostDetailDataType = {
  post_idx: string;
  user_idx: number;
  gym_idx: string;
  clearday: any;
  media: string[];
  content: string | null;
  color: string;
  createdAt: any;
  User: UserType;
  thumbnailUrl?: string[];
};
