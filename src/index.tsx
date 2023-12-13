import * as React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import styles from '@/base.scss';
import RoomAllocation from '@/components/RoomAllocation';
import { MEMBER_VARIANT } from '@/components/RoomAllocation/constants';

const App: React.FC = () => {
  const guest = 10;
  const room = 3;
  const [values, setValues] = useState(() => {
    const result = [];
    for (let i = 0; i < room; i++) {
      result.push({
        [MEMBER_VARIANT.ADULT]: 1,
        [MEMBER_VARIANT.CHILD]: 0,
      });
    }
    return result;
  });

  return (
    <div className={styles.wrapper}>
      <RoomAllocation
        guest={guest}
        room={room}
        values={values}
        onChange={(result) => {
          setValues(result);
        }}
      />
    </div>
  );
};

const root = () => {
  let root = document.getElementById('root');

  if (root) {
    return root;
  } else {
    root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
    return root;
  }
};

ReactDOM.createRoot(root()).render(<App />);
export { useLongPress } from '@/hooks/useLongPress';
