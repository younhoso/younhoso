import type { Meta, StoryObj } from '@storybook/react';

import Input from '..';

const meta = {
  title: 'component/Input',
  component: Input,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
