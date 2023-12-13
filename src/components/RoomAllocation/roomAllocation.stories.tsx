import { Meta, StoryObj } from '@storybook/react';
import RoomAllocation from './';

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
    onChange: {
      action: 'onChange',
    },
  },
  args: {
    guest: 5,
    room: 2,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
