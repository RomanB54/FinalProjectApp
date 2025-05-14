import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { HistoryList } from './HistoryList';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'MyApp/HistoryList',
  component: HistoryList,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof HistoryList>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const List: Story = {
  args: {
    cities: ['City1', 'City2', 'City3'],
    handleHistoryCityClick: fn(),
  },
};
