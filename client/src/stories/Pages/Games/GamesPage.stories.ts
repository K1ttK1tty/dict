import type { Meta, StoryObj } from '@storybook/react';

import '../../../styles/Games.css';
import '../../../styles/theme.css';

import { GamesUI } from './GamesPage';

const meta1 = {
    title: 'Example/Pages/Games',
    component: GamesUI,
} satisfies Meta<typeof GamesUI>;

export default meta1;
type Story = StoryObj<typeof meta1>;

export const WithoutCards: Story = {};
