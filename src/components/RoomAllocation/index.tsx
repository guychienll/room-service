import * as React from 'react';
import { useState } from 'react';
import { STEP_METHOD } from '@/components/CustomInputNumber/constants';
import clsx from 'clsx';
import styles from './roomAllocation.module.scss';
import RoomAllocator from '@/components/RoomAllocation/RoomAllocator';
import { MEMBER_VARIANT } from '@/components/RoomAllocation/constants';

type RoomAllocationProps = {
  guest: number;
  room: number;
  onChange: (result: Array<Record<MEMBER_VARIANT, number>>) => void;
};

const RoomAllocation: React.FC<RoomAllocationProps> = (props) => {
  const { guest, room, onChange } = props;
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

  const total = values.reduce((acc, cur) => {
    return acc + Object.values(cur).reduce((acc, cur) => acc + cur, 0);
  }, 0);

  return (
    <div className={clsx([styles.wrapper])}>
      <div className={clsx([styles.header])}>
        住客人數 : {guest} 人 / {room} 房
      </div>
      <div className={clsx([styles.info])}>
        尚未分配人數 : {guest - total} 人
      </div>
      {values.map((value, index) => {
        return (
          <RoomAllocator
            className={clsx([styles.roomAllocator])}
            key={index}
            values={value}
            onChange={(result) => {
              const nextValues = [...values];
              nextValues[index] = result;
              setValues(nextValues);
              onChange(nextValues);
            }}
            stepDisabled={{
              [STEP_METHOD.DOWN]: total <= room,
              [STEP_METHOD.UP]: total >= guest,
            }}
            validator={(prev, next) => {
              return total - prev + next <= guest;
            }}
          />
        );
      })}
    </div>
  );
};

export default RoomAllocation;
export { MEMBER_VARIANT_DETAIL } from '@/components/RoomAllocation/constants';
