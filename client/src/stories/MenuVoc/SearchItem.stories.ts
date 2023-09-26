import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/App.css';
import '../../styles/theme.css';

import { DropDownMenuUI } from './MenuVoc';

const meta1 = {
    title: 'Example/MenuVoc',
    component: DropDownMenuUI,
} satisfies Meta<typeof DropDownMenuUI>;

export default meta1;
type Story = StoryObj<typeof meta1>;

export const DropDownMenu: Story = {};
