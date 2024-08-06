import type { Meta, StoryObj } from '@storybook/react';

import Button from './index';

const meta = {
  title: 'component/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextLinkBtn: Story = {
  args: {},
};

export const TaskBtn: Story = {
  args: {},
};
