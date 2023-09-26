import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/App.css';
import '../../styles/theme.css';

import { CardGreenUI } from './Card';

const meta1 = {
    title: 'Example/Card',
    component: CardGreenUI,
} satisfies Meta<typeof CardGreenUI>;

export default meta1;
type Story = StoryObj<typeof meta1>;

export const GreenColor: Story = {};
