import * as React from 'react';
import { ChangeEvent, useEffect, useRef } from 'react';
import styles from '@/components/CustomInputNumber/customInputNumber.module.scss';
import clsx from 'clsx';
import { isOutOfRange } from '@/utils';
import { STEP_METHOD } from '@/components/CustomInputNumber/constants';
import { useLongPress } from '@/hooks/useLongPress';
import { v4 as uuid } from 'uuid';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { withErrorBoundary } from '@/components/ErrorBoundary';

export type CustomInputNumberProps = {
  id?: string;
  min: number;
  max: number;
  step: number;
  name: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  validator?: (prev: number, next: number) => boolean;
  stepDisabled?: {
    [STEP_METHOD.UP]?: boolean;
    [STEP_METHOD.DOWN]?: boolean;
  };
  longPressOptions?: {
    threshold: number;
    interval: number;
  };
};

const CustomInputNumber: React.FC<CustomInputNumberProps> = (props) => {
  const {
    id = uuid(),
    min,
    max,
    step,
    name,
    value,
    disabled = false,
    validator = () => true,
    stepDisabled = {
      [STEP_METHOD.UP]: false,
      [STEP_METHOD.DOWN]: false,
    },
    longPressOptions = {
      threshold: 1000,
      interval: 200,
    },
    onChange,
    onBlur,
  } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const minusRef = useRef<HTMLLabelElement | null>(null);
  const plusRef = useRef<HTMLLabelElement | null>(null);
  const { isLongPressing: isStepDownLongPressing, ...stepDownLongPressHook } =
    useLongPress(longPressOptions.threshold);
  const { isLongPressing: isStepUpLongPressing, ...stepUpLongPressHook } =
    useLongPress(longPressOptions.threshold);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: _value } = e.target;
    const isStep =
      (e.nativeEvent as CustomEvent<{ isStep: boolean }>).detail.isStep ||
      false;
    const nextCount = _value ? Number.parseInt(_value) : min;

    if (!isStep) {
      const isValid = validator(value, nextCount);
      if (!isValid) {
        return;
      }
    }

    if (isOutOfRange(nextCount, { max, min }) || disabled) {
      return;
    }

    onChange(e);
  };

  const handleStep = (method: STEP_METHOD) => () => {
    if (stepDisabled[method]) {
      return;
    }
    if (inputRef.current) {
      const nextCount = method === STEP_METHOD.UP ? value + step : value - step;

      const InputEvent = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        'value',
      )?.set;
      const event = new CustomEvent('input', {
        bubbles: true,
        detail: { isStep: true },
      });
      InputEvent?.call(inputRef.current, nextCount);
      inputRef.current.dispatchEvent(event);
    }
  };

  useEffect(() => {
    if (isStepDownLongPressing) {
      setTimeout(() => {
        handleStep(STEP_METHOD.DOWN)();
      }, longPressOptions.interval);
    }

    if (isStepUpLongPressing) {
      setTimeout(() => {
        handleStep(STEP_METHOD.UP)();
      }, longPressOptions.interval);
    }
  }, [isStepDownLongPressing, isStepUpLongPressing, value]);

  if (min >= max) {
    throw new Error('min must be less than max');
  }

  return (
    <div className={clsx([styles.wrapper])}>
      <label
        htmlFor={id}
        ref={minusRef}
        onClick={handleStep(STEP_METHOD.DOWN)}
        className={clsx([
          styles.button,
          disabled && styles.disabled,
          stepDisabled[STEP_METHOD.DOWN] && styles.disabled,
          value <= min && styles.disabled,
        ])}
        {...stepDownLongPressHook}
      >
        <AiOutlineMinus />
      </label>
      <input
        id={id}
        ref={inputRef}
        name={name}
        type="number"
        step={step}
        value={value}
        onChange={handleChange}
        onBlur={(e) => {
          onBlur && onBlur(e);
        }}
        disabled={disabled}
        className={clsx([styles.input])}
      />
      <label
        htmlFor={id}
        ref={plusRef}
        onClick={handleStep(STEP_METHOD.UP)}
        className={clsx([
          styles.button,
          disabled && styles.disabled,
          stepDisabled[STEP_METHOD.UP] && styles.disabled,
          value >= max && styles.disabled,
        ])}
        {...stepUpLongPressHook}
      >
        <AiOutlinePlus />
      </label>
    </div>
  );
};

export default withErrorBoundary(CustomInputNumber);
