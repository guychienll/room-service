import * as React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import CustomInputNumber, {
  CustomInputNumberProps,
} from '@/components/CustomInputNumber';
import { useArgs } from '@storybook/preview-api';

const meta: Meta<typeof CustomInputNumber> = {
  title: 'components/CustomInputNumber',
  component: CustomInputNumber,
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: {
        type: 'string',
      },
    },
    min: {
      control: {
        type: 'number',
      },
    },
    max: {
      control: {
        type: 'number',
      },
    },
    step: {
      control: {
        type: 'number',
      },
    },
    name: {
      control: {
        type: 'string',
      },
    },
    value: {
      control: {
        type: 'number',
      },
    },
    onChange: {
      action: 'onChange',
    },
    onBlur: {
      action: 'onBlur',
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
    validator: {
      control: {
        type: 'function',
      },
    },
    stepDisabled: {
      control: {
        type: 'object',
      },
    },
    longPressOptions: {
      control: {
        type: 'object',
      },
    },
  },
  args: {
    id: 'custom-input-number',
    min: 0,
    max: 10,
    step: 1,
    name: 'custom-input-number',
    value: 5,
    disabled: false,
    validator: () => true,
    stepDisabled: {
      up: false,
      down: false,
    },
    longPressOptions: {
      threshold: 1000,
      interval: 200,
    },
  },
  render: () => {
    const [args, setArgs] = useArgs<CustomInputNumberProps>();
    const _args = {
      ...args,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const isStep =
          (e.nativeEvent as CustomEvent<{ isStep: boolean }>).detail.isStep ||
          false;
        const nextCount = value ? Number.parseInt(value) : args.min;

        if (!isStep && args.validator) {
          const isValid = args.validator(args.value, nextCount);
          if (isValid) {
            setArgs({ ...args, value: nextCount });
          }
        } else {
          setArgs({ ...args, value: nextCount });
        }
        args.onChange(e);
      },
    };
    return <CustomInputNumber {..._args} />;
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/**
 * **min** : when reaching the minimum value, the step-down button will be disabled.
 */
export const Minimum: Story = {
  args: {
    min: 0,
    value: 0,
  },
};

/**
 * **max** : when reaching the maximum value, the step-up button will be disabled.
 */
export const Maximum: Story = {
  args: {
    max: 10,
    value: 10,
  },
};

/**
 * **stepDisabled.up** : if true, have a change to disable the step-up button.
 */
export const StepUpDisabled: Story = {
  args: {
    stepDisabled: {
      up: true,
    },
  },
};

/**
 * **stepDisabled.down** : if true, have a change to disable the step-down button.
 */
export const StepDownDisabled: Story = {
  args: {
    stepDisabled: {
      down: true,
    },
  },
};

/**
 * **disabled** : if true, the input and steppers are disabled.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

/**
 * **Threshold** : the threshold in milliseconds before the long press is triggered.<br/>
 * **Interval** : the interval in milliseconds between each trigger of the long press.
 */
export const Threshold: Story = {
  args: {
    longPressOptions: {
      threshold: 1000,
      interval: 200,
    },
  },
};

export const MinCanNotBiggerThanMax: Story = {
  args: {
    min: 10,
    max: 0,
  },
};
