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

//////////////////////////클라밍장 리스트 데이터//////////////////////////

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

//////////////////////////클라이밍장별 영상 데이터//////////////////////////

type likeType = {
  post_like_idx: number;
};
type postCommentType = {
  post_comment_idx: number;
  User: UserType;
  content: string;
};

export type UserType = {
  nickname: string;
  img: string;
};

export type DetailType = {
  post_idx: string;
  user_idx: number;
  gym_idx: number;
  clearday: any;
  media: string[];
  thumbnailUrl: string[];
  content: string | null;
  color: string;
  createdAt: any;
  like_count: number;
  post_comment_count: number;
  User: UserType;
  PostLikes: likeType[];
  post_comment: postCommentType[];
  is_like: boolean;
};

export type ClimbDetailResponseType = {
  gym_name: string; // 체육관 이름
  posts: DetailType[]; // 게시물 목록
  meta: metaType;
  length?: number;
};

//클라이밍장별 영상 좋아요 타입
export type VideoLikeType = {
  likeCount: number;
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

//////////////////////////프로필 타입들//////////////////////////

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

//////////////////////////포스트 디테일 타입들//////////////////////////

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
  like_count: number;
  is_liked: boolean;
};

//////////////////////////게시판 타입들//////////////////////////

type BoardlikeType = {
  board_like_idx: number;
};

export type CategroyListType = {
  category_idx: number;
  category: string;
};

export type LinkPreviewType = {
  title: string | null;
  img: string | null;
  link?: string | null;
};

export type BoardListDataType = {
  board_idx: string;
  user_idx: number;
  title: string;
  content: string;
  category: string;
  createdAt: any;
  updatedAt: any;
  img: string[];
  like_count: number;
  comment_count: number;
  User: UserType;
  board_like: BoardlikeType[];
  is_like: boolean;
  // linkPreview?: LinkPreviewType;
};

export type BoardResponseType = {
  boards: BoardListDataType[];
  meta: metaType;
};

//게시판 업로드 타입
export type useFormBoardUploadType = {
  title: string;
  content: string;
  category: string;
  img: string[];
};

//////////////////////////게시판 상세 타입들//////////////////////////

//게시판 상세 타입
export type BoardDetailDataType = {
  board_idx: string;
  user_idx: number;
  title: string;
  content: string;
  category: string;
  createdAt: any;
  updatedAt: any;
  img: string[];
  like_count: number;
  comment_count: number;
  User: UserType;
  board_like: BoardlikeType[];
  is_like: boolean;
  // linkPreview?: LinkPreviewType;
};

//게시판 상세 수정 타입

//게시판 상세 댓글 조회 타입

export type BoardCommentDetailType = {
  User: UserType;
  board_idx: number;
  comment_idx: string;
  content: string;
  createdAt: any;
  is_like: boolean;
  like_count: number;
  updatedAt: any;
  user_idx: number;
  recomment_count: number;
};

export type BoardCommentType = {
  comments: [];
  meta: metaType;
};

//게시판 댓글 생성 타입

export type BoardCommentUploadType = {
  board_idx: string;
  content: string;
};

//게시판 대댓글  조회 타입

export type RecommentType = {
  User: UserType;
  comment_idx: string;
  content: string;
  createdAt: any;
  recomment_idx: string;
  updateAt: any;
  user_idx: number;
  like_count: number;
  is_like: boolean;
};

export type BoardRecommentType = {
  recomments: RecommentType[];
  meta: metaType;
};

//게시판 대댓글 생성 타입
export type BoardRecommentUploadType = {
  comment_idx: number;
  content: string;
};

//게시판 대댓글 삭제 타입
