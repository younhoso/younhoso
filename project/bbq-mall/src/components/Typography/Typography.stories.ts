import type { Meta, StoryObj } from '@storybook/react';

import Typography from './index';

const meta = {
  title: 'foundation/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: { type: 'text' },
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Font: Story = {
  args: {
    label: '가나다라마바사아자차카타파하 0123456789',
  },
};
