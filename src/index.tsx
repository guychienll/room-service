import * as React from 'react';
import ReactDOM from 'react-dom/client';
import CustomInputNumber from '@/components/CustomInputNumber';
import { useState } from 'react';

const App: React.FC = () => {
  const [value, setValue] = useState(0);
  return (
    <div>
      <CustomInputNumber
        id="custom-input"
        max={20}
        min={0}
        name="custom-input"
        onChange={(e) => {
          setValue(Number.parseInt(e.target.value));
        }}
        step={2}
        value={value}
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
