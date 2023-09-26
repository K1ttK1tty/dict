import type { Meta, StoryObj } from '@storybook/react';

import '../../../styles/Games.css';
import '../../../styles/theme.css';

import { GamesWithCardsUI } from './GamesPage';

const meta1 = {
    title: 'Example/Pages/Games',
    component: GamesWithCardsUI,
} satisfies Meta<typeof GamesWithCardsUI>;

export default meta1;
type Story = StoryObj<typeof meta1>;

export const WithCards: Story = {};
