import * as React from 'react';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import styles from '@/components/CustomInputNumber/customInputNumber.scss';
import clsx from 'clsx';
import { isOutOfRange } from '@/utils';
import { StepMethod } from '@/components/CustomInputNumber/constants';
import { useLongPress } from '@/hooks/useLongPress';

type Props = {
  id: string;
  min: number;
  max: number;
  step: number;
  name: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  longPressOptions?: {
    threshold: number;
    interval: number;
  };
};

const CustomInputNumber: React.FC<Props> = (props) => {
  const {
    id,
    min,
    max,
    step,
    name,
    value,
    disabled = false,
    longPressOptions = {
      threshold: 1000,
      interval: 200,
    },
    onChange,
    onBlur,
  } = props;
  const [count, setCount] = useState<number>(value);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const minusRef = useRef<HTMLLabelElement | null>(null);
  const plusRef = useRef<HTMLLabelElement | null>(null);
  const { isLongPressing: isStepDownLongPressing, ...stepDownLongPressHook } =
    useLongPress(longPressOptions.threshold);
  const { isLongPressing: isStepUpLongPressing, ...stepUpLongPressHook } =
    useLongPress(longPressOptions.threshold);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: _value } = e.target;
    const nextCount = _value ? Number.parseInt(_value) : min;
    if (isOutOfRange(nextCount, { max, min })) {
      return;
    }
    setCount(nextCount);
    onChange && onChange(e);
  };

  const handleStep = (method: StepMethod) => () => {
    if (inputRef.current) {
      const nextCount = method === StepMethod.Up ? count + step : count - step;

      const InputEvent = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        'value',
      )?.set;
      const event = new Event('input', { bubbles: true });
      InputEvent?.call(inputRef.current, nextCount);
      inputRef.current.dispatchEvent(event);
    }
  };

  useEffect(() => {
    if (isStepDownLongPressing) {
      setTimeout(() => {
        handleStep(StepMethod.Down)();
      }, longPressOptions.interval);
    }

    if (isStepUpLongPressing) {
      setTimeout(() => {
        handleStep(StepMethod.Up)();
      }, longPressOptions.interval);
    }
  }, [isStepDownLongPressing, isStepUpLongPressing, count]);

  if (min >= max) {
    throw new Error('min must be less than max');
  }

  return (
    <div className={clsx([styles.wrapper])}>
      <label
        htmlFor={id}
        ref={minusRef}
        onClick={handleStep(StepMethod.Down)}
        className={clsx([styles.button, disabled && styles.disabled])}
        {...stepDownLongPressHook}
      >
        -
      </label>
      <input
        id={id}
        ref={inputRef}
        name={name}
        type="number"
        step={step}
        value={count}
        onChange={(e) => {
          handleChange(e);
        }}
        onBlur={(e) => {
          onBlur && onBlur(e);
        }}
        disabled={disabled}
        className={clsx([styles.input])}
      />
      <label
        htmlFor={id}
        ref={plusRef}
        onClick={handleStep(StepMethod.Up)}
        className={clsx([styles.button, disabled && styles.disabled])}
        {...stepUpLongPressHook}
      >
        +
      </label>
    </div>
  );
};

export default CustomInputNumber;
