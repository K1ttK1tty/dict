import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/App.css';

import { MenuDescUI } from './MenuDesc';

const meta1 = {
    title: 'Example/MenuDesc',
    component: MenuDescUI,
} satisfies Meta<typeof MenuDescUI>;

export default meta1;
type Story = StoryObj<typeof meta1>;

export const Menu: Story = {};
