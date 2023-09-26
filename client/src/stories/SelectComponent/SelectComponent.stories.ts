import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/App.css';

import { SelectComponentUI } from './SelectComponent';

const meta1 = {
    title: 'Example/SelectComponent',
    component: SelectComponentUI,
} satisfies Meta<typeof SelectComponentUI>;

export default meta1;
type Story = StoryObj<typeof meta1>;

export const openAndRemoveMark: Story = {
    args: {
        open: true,
        removeMark: true,
    },
};
