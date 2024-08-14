// 'use client';
// import React, { useState } from 'react';
// import classNames from 'classnames/bind';
// import styles from './VideoInput.module.scss';
// import { useMutation } from '@tanstack/react-query';
// import LoadingSpinner from '@/src/components/common/loadingSpinner';
// import instance from '@/src/utils/axios';
// import ModalChoice from '../moadlChoice';
// import { useModal } from '@/src/hooks/useModal';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import styled from 'styled-components';

// const cn = classNames.bind(styles);

// const StyledSlider = styled(Slider)`
//   .slick-list {
//     overflow: hidden; // 슬라이더의 양쪽 부분이 잘리도록 설정
//   }

//   .slick-slide {
//     display: flex;
//     justify-content: center; // 내부 요소를 중앙에 배치
//     align-items: center; // 수직으로도 중앙에 배치
//     opacity: 0.5; // 기본적으로 슬라이드들의 투명도를 낮게 설정
//     padding: 0 15px; // 슬라이드 간격을 고정
//   }

//   .slick-center {
//     opacity: 1 !important; // 가운데 슬라이드만 완전한 불투명도
//   }

//   .slick-track {
//     display: flex;
//     justify-content: center; // 트랙을 중앙 정렬
//   }
// `;

// const VideoWrapper = styled.div`
//   margin: 0 auto; // 부모 요소를 중앙에 정렬
//   width: 100%;
//   max-width: 900px; // 슬라이더의 최대 너비 설정
// `;

// const VideoElement = styled.video`
//   width: 100%; // 비디오가 슬라이드의 전체 너비를 채우도록 설정
//   max-width: 280px; // 비디오의 최대 너비 설정
//   border-radius: 10px;
// `;

// type VideoInputProps = {
//   mediaUrl: {
//     videoUrl: string[];
//     thumbnailUrl: string | null;
//   };
//   setMediaUrl: React.Dispatch<
//     React.SetStateAction<{
//       videoUrl: string[];
//       thumbnailUrl: null;
//     }>
//   >;
// };

// const VideoInput = ({ mediaUrl, setMediaUrl }: VideoInputProps) => {
//   const [fileUploaded, setFileUploaded] = useState(false);
//   const { showModalHandler } = useModal();

//   const { mutate: videoUpload, isPending } = useMutation({
//     mutationKey: ['videoFile'],
//     mutationFn: async (videos: FormData) => {
//       const response = await instance.post('/api/videos', videos, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       return response.data; // API 응답 데이터 반환
//     },
//     onSuccess: (data) => {
//       // 성공적으로 업로드된 경우 mediaUrl을 상태에 저장
//       setMediaUrl({
//         videoUrl: data.videoUrls,
//         thumbnailUrl: data.thumbnailUrl,
//       });
//       setFileUploaded(true);
//     },
//     onError: (error) => {
//       showModalHandler('alert', '영상을 1분 이하로 업로드 해주세요');
//       console.error('파일 업로드 실패:', error);
//     },
//   });

//   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     const maxSize = 500 * 1024 * 1024;

//     if (files && files.length > 0) {
//       const formData = new FormData();

//       for (let i = 0; i < files.length; i++) {
//         const file = files[i];
//         console.log(`파일 크기: ${file.size}, 최대 허용 크기: ${maxSize}`);

//         if (file.size > maxSize) {
//           showModalHandler('alert', '영상을 500MB 이하로 업로드 해주세요');
//           return;
//         }

//         formData.append('videos', file);
//       }

//       videoUpload(formData);
//     }
//   };

//   const handleCancel = () => {
//     setMediaUrl({
//       videoUrl: [],
//       thumbnailUrl: null,
//     });
//     setFileUploaded(false);
//   };

//   const settings = {
//     dots: true,
//     infinite: false,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: false,
//     centerMode: true,
//     centerPadding: '0px',
//     draggable: true,
//   };

//   if (isPending) {
//     return <LoadingSpinner />;
//   }

//   return (
//     <div className={cn('container')}>
//       {/* <label onClick={handleCancel}>삭제</label> */}
//       <>
//         <label htmlFor="fileUpload">업로드</label>
//         <input
//           type="file"
//           id="fileUpload"
//           className={cn('filetextInput')}
//           multiple
//           accept="video/*"
//           onChange={handleFileUpload}
//         />
//       </>
//       <div className={styles.uploadInput}>
//         <VideoWrapper>
//           <StyledSlider {...settings}>
//             {mediaUrl.videoUrl?.map((url, index) => (
//               <div key={index}>
//                 <VideoElement
//                   src={url}
//                   controls
//                   playsInline
//                   muted
//                   controlsList="nodownload"
//                 />
//               </div>
//             ))}
//           </StyledSlider>
//         </VideoWrapper>
//       </div>
//       <ModalChoice />
//     </div>
//   );
// };

// export default VideoInput;

'use client';
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './VideoInput.module.scss';
import { useMutation } from '@tanstack/react-query';
import LoadingSpinner from '@/src/components/common/loadingSpinner';
import instance from '@/src/utils/axios';
import ModalChoice from '../moadlChoice';
import { useModal } from '@/src/hooks/useModal';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import { CircleXIcon } from '@/public/icon';

const cn = classNames.bind(styles);

const StyledSlider = styled(Slider)`
  .slick-list {
    overflow: hidden; // 슬라이더의 양쪽 부분이 잘리도록 설정
  }

  .slick-slide {
    display: flex;
    justify-content: center; // 내부 요소를 중앙에 배치
    align-items: center; // 수직으로도 중앙에 배치
    opacity: 0.5; // 기본적으로 슬라이드들의 투명도를 낮게 설정
    padding: 0 15px; // 슬라이드 간격을 고정
  }

  .slick-center {
    opacity: 1 !important; // 가운데 슬라이드만 완전한 불투명도
  }

  .slick-track {
    display: flex;
    justify-content: center; // 트랙을 중앙 정렬
  }
`;

const VideoWrapper = styled.div`
  margin: 0 auto; // 부모 요소를 중앙에 정렬
  width: 100%;
  max-width: 900px; // 슬라이더의 최대 너비 설정
`;

const VideoElement = styled.video`
  width: 100%; // 비디오가 슬라이드의 전체 너비를 채우도록 설정
  max-width: 280px; // 비디오의 최대 너비 설정
  border-radius: 10px;
`;

type VideoInputProps = {
  mediaUrl: {
    videoUrl: string[];
    thumbnailUrl: string | null;
  };
  setMediaUrl: React.Dispatch<
    React.SetStateAction<{
      videoUrl: string[];
      thumbnailUrl: null;
    }>
  >;
};

const VideoInput = ({ mediaUrl, setMediaUrl }: VideoInputProps) => {
  const [fileUploaded, setFileUploaded] = useState(false);
  const { showModalHandler } = useModal();

  const { mutate: videoUpload, isPending } = useMutation({
    mutationKey: ['videoFile'],
    mutationFn: async (videos: FormData) => {
      const response = await instance.post('/api/videos', videos, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data; // API 응답 데이터 반환
    },
    onSuccess: (data) => {
      // 성공적으로 업로드된 경우 mediaUrl을 상태에 저장
      setMediaUrl({
        videoUrl: data.videoUrls,
        thumbnailUrl: data.thumbnailUrl,
      });
      setFileUploaded(true);
    },
    onError: (error) => {
      showModalHandler('alert', '영상을 1분 이하로 업로드 해주세요');
      console.error('파일 업로드 실패:', error);
    },
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const maxSize = 500 * 1024 * 1024;

    if (files && files.length > 0) {
      const formData = new FormData();

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        console.log(`파일 크기: ${file.size}, 최대 허용 크기: ${maxSize}`);

        if (file.size > maxSize) {
          showModalHandler('alert', '영상을 500MB 이하로 업로드 해주세요');
          return;
        }

        formData.append('videos', file);
      }

      videoUpload(formData);
    }
  };

  const handleCancel = () => {
    setMediaUrl({
      videoUrl: [],
      thumbnailUrl: null,
    });
    setFileUploaded(false);
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    centerMode: true,
    centerPadding: '0px',
    draggable: true,
  };

  if (isPending) {
    return <LoadingSpinner />;
  }

  return (
    <div className={cn('container')}>
      {/* <label onClick={handleCancel}>삭제</label> */}
      <>
        <label htmlFor="fileUpload">업로드</label>
        <input
          type="file"
          id="fileUpload"
          className={cn('filetextInput')}
          multiple
          accept="video/*"
          onChange={handleFileUpload}
        />
      </>
      <div className={styles.uploadInput}>
        <VideoWrapper>
          <StyledSlider {...settings}>
            {mediaUrl.videoUrl?.map((url, index) => (
              <div key={index} className={cn('video')}>
                {/* <CircleXIcon className={cn('close')} onClick={handleCancel} /> */}
                <VideoElement
                  src={url}
                  controls
                  playsInline
                  muted
                  controlsList="nodownload"
                />
              </div>
            ))}
          </StyledSlider>
        </VideoWrapper>
      </div>
      <ModalChoice />
    </div>
  );
};

export default VideoInput;
