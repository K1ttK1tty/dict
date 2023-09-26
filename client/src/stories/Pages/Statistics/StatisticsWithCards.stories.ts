import type { Meta, StoryObj } from '@storybook/react';


import { StatisticsWithCardsUI } from './StatisticsPage';

const meta1 = {
    title: 'Example/Pages/Statistics',
    component: StatisticsWithCardsUI,
} satisfies Meta<typeof StatisticsWithCardsUI>;

export default meta1;
type Story = StoryObj<typeof meta1>;

export const WithCards: Story = {};
