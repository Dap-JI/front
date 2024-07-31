import Image from 'next/image';

const LoadingSpinner = () => {
  return (
    <div>
      <Image
        src="/icon/spinner.gif"
        width="50"
        height="50"
        alt="loadingSpinner"
      />
    </div>
  );
};

export default LoadingSpinner;
