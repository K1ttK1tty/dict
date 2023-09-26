import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/App.css';

import { CardsInfoUI } from './CardsInfo';

const meta1 = {
    title: 'Example/CardsInfo',
    component: CardsInfoUI,
} satisfies Meta<typeof CardsInfoUI>;

export default meta1;
type Story = StoryObj<typeof meta1>;

export const info: Story = {};
