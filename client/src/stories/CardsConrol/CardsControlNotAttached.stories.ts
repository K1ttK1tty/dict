import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/App.css';

import { NotAttachedCardsControlUI } from './CardsControl';

const meta1 = {
    title: 'Example/CardsControl',
    component: NotAttachedCardsControlUI,
} satisfies Meta<typeof NotAttachedCardsControlUI>;

export default meta1;
type Story = StoryObj<typeof meta1>;

export const NotAttached: Story = {};
