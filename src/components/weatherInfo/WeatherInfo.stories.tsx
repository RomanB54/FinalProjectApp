import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { WeatherInfo } from './WeatherInfo';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'MyApp/WeatherInfo',
  component: WeatherInfo,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof WeatherInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const WeatherInfo1: Story = {
  args: {
    city: 'Test',
    temperature: '36',
    icon: '4d',
  },
};
