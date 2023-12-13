import * as React from 'react';
import { ChangeEvent } from 'react';
import { STEP_METHOD } from '@/components/CustomInputNumber/constants';
import RoomAllocationCounter from '@/components/RoomAllocation/RoomAllocationCounter';
import clsx from 'clsx';
import styles from './roomAllocator.module.scss';
import {
  MEMBER_VARIANT,
  MEMBER_VARIANT_DETAIL,
} from '@/components/RoomAllocation/constants';

type RoomAllocatorProps = {
  values: Record<MEMBER_VARIANT, number>;
  onChange: (value: Record<MEMBER_VARIANT, number>) => void;
  disabled?: boolean;
  stepDisabled?: {
    [STEP_METHOD.UP]?: boolean;
    [STEP_METHOD.DOWN]?: boolean;
  };
  className?: string;
  validator?: (prev: number, next: number) => boolean;
};

const RoomAllocator: React.FC<RoomAllocatorProps> = (props) => {
  const {
    values,
    onChange,
    disabled = false,
    stepDisabled = {
      [STEP_METHOD.UP]: false,
      [STEP_METHOD.DOWN]: false,
    },
    className,
    validator = () => true,
  } = props;

  const total = Object.values(values).reduce((acc, cur) => acc + cur, 0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const nextValue = value
      ? parseInt(value)
      : MEMBER_VARIANT_DETAIL[name as MEMBER_VARIANT].limitation.min;

    onChange({ ...values, [name]: nextValue });
  };

  return (
    <div className={clsx([styles.wrapper, className])}>
      <div className={clsx(styles.header)}>房間：{total} 人</div>
      <RoomAllocationCounter
        className={clsx(styles.counter)}
        onChange={handleChange}
        name={MEMBER_VARIANT.ADULT}
        value={values.adult}
        variant={MEMBER_VARIANT_DETAIL[MEMBER_VARIANT.ADULT]}
        limitation={MEMBER_VARIANT_DETAIL[MEMBER_VARIANT.ADULT].limitation}
        disabled={disabled}
        stepDisabled={stepDisabled}
        validator={validator}
      />
      <RoomAllocationCounter
        className={clsx([styles.counter, styles.child])}
        onChange={handleChange}
        name={MEMBER_VARIANT.CHILD}
        value={values.child}
        variant={MEMBER_VARIANT_DETAIL[MEMBER_VARIANT.CHILD]}
        limitation={MEMBER_VARIANT_DETAIL[MEMBER_VARIANT.CHILD].limitation}
        disabled={disabled}
        stepDisabled={stepDisabled}
        validator={validator}
      />
    </div>
  );
};

export default RoomAllocator;
