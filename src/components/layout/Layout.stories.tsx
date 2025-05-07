import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Layout } from './Layout';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'MyApp/Layout',
  component: Layout,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof Layout>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Layout1: Story = {
  args: {
    city: 'Test',
    temperature: '36',
    icon: '4d',
    value: 'Input value',
    urlImg: 'https://test.com/test.png',
    cities: ['City1', 'City2', 'City3'],
    handleCity: fn(),
    onChange: fn(),
    handleHistoryCityClick: fn(),
  },
};
