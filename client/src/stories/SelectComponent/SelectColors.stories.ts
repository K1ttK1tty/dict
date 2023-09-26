import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/App.css';

import { ColorsUI } from './SelectComponent';

const meta1 = {
    title: 'Example/SelectComponent',
    component: ColorsUI,
} satisfies Meta<typeof ColorsUI>;

export default meta1;
type Story = StoryObj<typeof meta1>;

export const Colors: Story = {};
