import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/App.css';

import { AttachedCardsControlUI } from './CardsControl';

const meta1 = {
    title: 'Example/CardsControl',
    component: AttachedCardsControlUI,
} satisfies Meta<typeof AttachedCardsControlUI>;

export default meta1;
type Story = StoryObj<typeof meta1>;

export const Attached: Story = {};
