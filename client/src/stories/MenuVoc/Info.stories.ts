import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/App.css';

import { InfoUI } from './MenuVoc';

const meta1 = {
    title: 'Example/MenuVoc',
    component: InfoUI,
} satisfies Meta<typeof InfoUI>;

export default meta1;
type Story = StoryObj<typeof meta1>;

export const Info: Story = {};
