import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Header } from './Header';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'MyApp/Header',
  component: Header,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const h1: Story = {
  args: {
    text: 'Header1',
    size: 1,
    className: 'header1',
  },
};

export const h2: Story = {
  args: {
    text: 'Header2',
    size: 2,
    className: 'header2',
  },
};

export const h3: Story = {
  args: {
    text: 'Header3',
    size: 3,
    className: 'header3',
  },
};
