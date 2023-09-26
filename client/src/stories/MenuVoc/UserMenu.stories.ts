import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/App.css';

import { UserMenuUI } from './MenuVoc';

const meta1 = {
    title: 'Example/MenuVoc',
    component: UserMenuUI,
} satisfies Meta<typeof UserMenuUI>;

export default meta1;
type Story = StoryObj<typeof meta1>;

export const UserMenu: Story = {
    args: {
        isActivated: false,
        isDropDownMenuOpen: false,
    },
};
