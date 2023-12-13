import * as React from 'react';
import { STEP_METHOD } from '@/components/CustomInputNumber/constants';
import clsx from 'clsx';
import styles from './roomAllocation.module.scss';
import RoomAllocator from '@/components/RoomAllocation/RoomAllocator';
import { MEMBER_VARIANT } from '@/components/RoomAllocation/constants';
import { withErrorBoundary } from '@/components/ErrorBoundary';

export type RoomAllocationProps = {
  guest: number;
  room: number;
  values: Array<Record<MEMBER_VARIANT, number>>;
  onChange: (result: Array<Record<MEMBER_VARIANT, number>>) => void;
};

const RoomAllocation: React.FC<RoomAllocationProps> = (props) => {
  const { guest, room, onChange, values } = props;

  const total = values.reduce((acc, cur) => {
    return acc + Object.values(cur).reduce((acc, cur) => acc + cur, 0);
  }, 0);

  if (guest < room) {
    throw new Error('guest can not less than room');
  }

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

export default withErrorBoundary(RoomAllocation);

export { MEMBER_VARIANT_DETAIL } from '@/components/RoomAllocation/constants';
