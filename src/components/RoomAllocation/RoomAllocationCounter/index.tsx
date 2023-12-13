import clsx from 'clsx';
import CustomInputNumber from '@/components/CustomInputNumber';
import * as React from 'react';
import { ChangeEvent } from 'react';
import styles from './roomAllocationCounter.module.scss';
import { STEP_METHOD } from '@/components/CustomInputNumber/constants';
import { Limitation } from '@/components/RoomAllocation/types';

type RoomAllocationCounterProps = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: number;
  name: string;
  disabled?: boolean;
  stepDisabled?: {
    [STEP_METHOD.UP]?: boolean;
    [STEP_METHOD.DOWN]?: boolean;
  };
  variant: {
    title: string;
    description?: string;
  };
  limitation: Limitation;
  className?: string;
  validator?: (prev: number, next: number) => boolean;
};

const RoomAllocationCounter = (props: RoomAllocationCounterProps) => {
  const {
    onChange,
    value,
    name,
    limitation,
    variant,
    disabled = false,
    stepDisabled = {
      [STEP_METHOD.UP]: false,
      [STEP_METHOD.DOWN]: false,
    },
    className,
    validator = () => true,
  } = props;

  return (
    <div className={clsx([styles.wrapper, className])}>
      <div className={clsx([styles.variant])}>
        <div className={clsx([styles.title])}>{variant.title}</div>
        {variant.description && (
          <div className={clsx([styles.description])}>
            {variant.description}
          </div>
        )}
      </div>
      <CustomInputNumber
        max={limitation.max}
        min={limitation.min}
        name={name}
        onChange={onChange}
        step={1}
        value={value}
        disabled={disabled}
        stepDisabled={stepDisabled}
        validator={validator}
      />
    </div>
  );
};

export default RoomAllocationCounter;
