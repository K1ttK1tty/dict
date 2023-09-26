import type { Meta, StoryObj } from '@storybook/react';


import { StatisticsWithoutCardsUI } from './StatisticsPage';

const meta1 = {
    title: 'Example/Pages/Statistics',
    component: StatisticsWithoutCardsUI,
} satisfies Meta<typeof StatisticsWithoutCardsUI>;

export default meta1;
type Story = StoryObj<typeof meta1>;

export const WithoutCards: Story = {};
