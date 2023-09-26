import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/App.css';
import '../../styles/theme.css';

import { CardNewUI } from './Card';

const meta1 = {
    title: 'Example/Card',
    component: CardNewUI,
} satisfies Meta<typeof CardNewUI>;

export default meta1;
type Story = StoryObj<typeof meta1>;

export const New: Story = {};
