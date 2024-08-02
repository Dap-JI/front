import Image from 'next/image';

const LoadingSpinner = () => {
  return (
    <div>
      <Image
        src="/icon/spinner.gif"
        width="50"
        height="50"
        alt="loadingSpinner"
        priority
      />
    </div>
  );
};

export default LoadingSpinner;
