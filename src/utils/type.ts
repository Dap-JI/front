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

//////////////////////////클라밍장 리스트 페이지 데이터//////////////////////////

export type GymsType = {
  gym_idx: number;
  name: string;
  address?: string;
  logo: string | null;
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
};

//////////////////////////클라이밍장별 영상 페이지 데이터//////////////////////////

type postCommentType = {
  post_comment_idx: number;
  content: string;
  user_idx: number;
  User: UserType;
};

export type UserType = {
  nickname: string;
  img: string;
};
export type NoticeDetailType = {
  gym_notice_idx: string;
  title: string;
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
  post_comment: postCommentType[];
  is_like: boolean;
};

export type ClimbDetailResponseType = {
  gym_name: string; // 체육관 이름
  posts: DetailType[]; // 게시물 목록
  meta: metaType;
  notice: NoticeDetailType;
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

//////////////////////////프로필 페이지 타입들//////////////////////////

export type ProfilePostDetailType = {
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

export type ProfilePostType = {
  data: ProfilePostType;
  user: ProfileUserType;
  posts: ProfilePostDetailType[];
  meta: metaType;
  isOwnProfile: boolean;
  isFollowing: boolean;
  userRole: string;
  followerCount: number;
  followingCount: number;
};

export type ProfileBoardDetailType = {
  board_idx: string;
  title: string;
  category: string;
  created_at: any;
  like_count: number;
  comment_count: number;
};

export type ProfileBoardType = {
  user: ProfileUserType;
  boards: ProfileBoardDetailType[];
  meta: metaType;
  isOwnProfile: boolean;
  userRole: string;
};

//프로필 수정 폼타입
export type useFormProfileEditProps = {
  nickname: string;
  introduce: string;
};

//팔로우 상세 타입
export type FollowDetailType = {
  img: string;
  nickname: string;
  user_idx: number;
};

// 팔로잉 타입
export type FollowingType = {
  following: FollowDetailType[];
  meta: metaType; // 메타 정보
};

// 팔로워  타입
export type FollowerType = {
  followers: FollowDetailType[];
  meta: metaType; // 메타 정보
};

//팔로우 요청 타입
export type FollowRequestType = {
  follower_idx: number;
  following_idx: string;
};

//////////////////////////포스트 디테일 페이지 타입들//////////////////////////

// 포스트 상세페이지  타입
export type PostDetailDataType = {
  post_idx: string;
  user_idx: number;
  gym_idx: string;
  clearday: any;
  media: string[];
  thumbnailUrl?: string[];
  content: string | null;
  color: string;
  createdAt: any;
  like_count: number;
  post_comment_count: number;
  User: UserType;
  is_liked: boolean;
};

//포스트 댓글 타입

export type PostCommentDetailType = {
  User: UserType;
  content: string;
  createdAt: any;
  is_like: boolean;
  like_count: number;
  post_comment_idx: string;
  post_idx: number;
  post_recomment_count: number;
  updatedAt: any;
  user_idx: number;
};

//포스트 댓글 타입 모음
export type PostCommentType = {
  postComments: PostCommentDetailType[];
  meta: metaType;
};

//포스트 댓글 생성 타입

export type PostCommentUploadType = {
  post_idx: string;
  content: string;
};

//포스트 답글 조회 타입

export type PostRecommentDetailType = {
  post_recomment_idx: string;
  post_comment_idx: string;
  user_idx: number;
  content: string;
  createdAt: any;
  updateAt: any;
  User: UserType;
  like_count: number;
  is_like: boolean;
};

export type PostRecommentType = {
  postRecomments: PostRecommentDetailType[];
  meta: metaType;
};

//////////////////////////게시판 페이지 타입들//////////////////////////

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

//게시판 상세 댓글 조회 타입

export type BoardCommentDetailType = {
  comment_idx: string;
  board_idx: number;
  user_idx: number;
  content: string;
  createdAt: any;
  updatedAt: any;
  like_count: number;
  User: UserType;
  is_like: boolean;
  recomment_count: number;
};

export type BoardCommentType = {
  comments: BoardCommentDetailType[];
  meta: metaType;
};

//게시판 댓글 생성 타입

export type BoardCommentUploadType = {
  board_idx: string;
  content: string;
};

//게시판 답글  조회 타입

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

//게시판 답글 생성 타입
export type BoardRecommentUploadType = {
  comment_idx: number;
  content: string;
};

//////////////////////////유저 검색 타입//////////////////////////

export type userSearchDetailType = {
  user_idx: string;
  nickname: string;
  img: string | null;
  introduce: string;
};

export type UserSearchType = {
  users: userSearchDetailType[];
  meta: metaType;
};

//////////////////////////관리자 페이지//////////////////////////

//공지 조회 타입
export type noticeDataType = {
  gym_notice_idx: string;
  gym_idx: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

//공지 업로드 타입
export type useFormNoticeUploadType = {
  title: string;
  content: string;
};
