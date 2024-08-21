const useTimeAgo = (create_At: string) => {
  const date = new Date(create_At); // create_At 시간을 Date 객체로 변환
  const now = new Date(); // 현재 시간을 Date 객체로 생성 (한국 시간 기준)

  const milliSeconds = now.getTime() - date.getTime(); // 현재 시간과 create_At 시간의 차이를 계산
  const seconds = milliSeconds / 1000; // 초 단위로 변환
  const minutes = seconds / 60; // 분 단위로 변환
  const hours = minutes / 60; // 시간 단위로 변환
  const days = hours / 24; // 일 단위로 변환
  const months = days / 30.44; // 평균적으로 한 달이 30.44일
  const years = days / 365.25; // 평균적으로 한 해가 365.25일

  const timeAgo = () => {
    if (seconds < 60) {
      return '방금 전'; // 60초 이내일 때 방금 전
    }
    if (minutes < 60) {
      return `${Math.floor(minutes)}분 전`; // 60분 이내일 때 분 단위로
    }
    if (hours < 24) {
      return `${Math.floor(hours)}시간 전`; // 24시간 이내일 때 시간 단위로
    }
    if (days < 30) {
      return `${Math.floor(days)}일 전`; // 30일 이내일 때 일 단위로
    }
    if (months < 12) {
      return `${Math.floor(months)}개월 전`; // 12개월 이내일 때 월 단위로
    }
    return `${Math.floor(years)}년 전`; // 그 이상은 년 단위로
  };

  return timeAgo();
};

export default useTimeAgo;
