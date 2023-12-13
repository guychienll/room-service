import { Meta, StoryObj } from '@storybook/react';
import RoomAllocation, { RoomAllocationProps } from './';
import { useArgs } from '@storybook/preview-api';
import * as React from 'react';
import { MEMBER_VARIANT } from '@/components/RoomAllocation/constants';

const meta: Meta<typeof RoomAllocation> = {
  title: 'components/RoomAllocation',
  component: RoomAllocation,
  tags: ['autodocs'],
  argTypes: {
    guest: {
      control: {
        type: 'number',
      },
    },
    room: {
      control: {
        type: 'number',
      },
    },
    values: {
      control: {
        type: 'object',
      },
    },
    onChange: {
      action: 'onChange',
    },
  },
  args: {
    guest: 10,
    room: 3,
    values: [
      {
        adult: 1,
        child: 0,
      },
      {
        adult: 1,
        child: 0,
      },
      {
        adult: 1,
        child: 0,
      },
    ],
  },
  render: () => {
    const [args, setArgs] = useArgs<RoomAllocationProps>();
    const _args = {
      ...args,
      onChange: (result: Array<Record<MEMBER_VARIANT, number>>) => {
        setArgs({
          ...args,
          values: result,
        });
        args.onChange(result);
      },
    };
    return <RoomAllocation {..._args} />;
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Full: Story = {
  args: {
    guest: 10,
    room: 3,
    values: [
      {
        adult: 4,
        child: 0,
      },
      {
        adult: 4,
        child: 0,
      },
      {
        adult: 2,
        child: 0,
      },
    ],
  },
};

export const AdultLimitation: Story = {
  args: {
    guest: 10,
    room: 3,
    values: [
      {
        adult: 1,
        child: 0,
      },
      {
        adult: 1,
        child: 0,
      },
      {
        adult: 1,
        child: 0,
      },
    ],
  },
};

export const GuestCanNotBeSmallerThanRoom: Story = {
  args: {
    guest: 2,
    room: 3,
    values: [
      {
        adult: 1,
        child: 0,
      },
      {
        adult: 1,
        child: 0,
      },
      {
        adult: 1,
        child: 0,
      },
    ],
  },
};
