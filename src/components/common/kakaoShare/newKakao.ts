const newKakao = (url: string) => {
  if (!window.Kakao.isInitialized()) {
    const key = process.env.NEXT_PUBLIC_KAKAO_API_KEY;
    window.Kakao.init(key);
  }

  window.Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: 'DapJi',
      description: '답지를 공유해보세요!',
      imageUrl: '/icon/icon.png',
      link: {
        mobileWebUrl: url,
        webUrl: url,
      },
    },
  });
};

export default newKakao;
