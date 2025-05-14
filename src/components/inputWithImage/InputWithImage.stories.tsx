import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { InputWithImage } from './InputWithImage';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'MyApp/InputWithImage',
  component: InputWithImage,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof InputWithImage>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Input1: Story = {
  args: {
    value: 'Input text 1',
    handleCity: fn(),
    onChange: fn(),
    urlImg: 'linkToImage',
  },
};
