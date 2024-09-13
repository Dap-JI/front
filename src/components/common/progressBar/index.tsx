import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import useProgressStore from '@/src/utils/store/useProgressStore';

const ProgressBar = () => {
  const { progress, setProgress } = useProgressStore();

  return (
    <div style={{ width: '100px', marginTop: '10px' }}>
      <CircularProgressbar
        value={progress}
        text={`${progress}%`}
        styles={buildStyles({
          trailColor: '#d6d6d6',
        })}
      />
    </div>
  );
};

export default ProgressBar;
