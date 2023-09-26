import type { Meta, StoryObj } from '@storybook/react';

import '../../components/UI/Checkbox/Checkbox.module.css';

import '../../styles/App.css';
import '../../styles/theme.css';

import { CheckboxNotChecked } from './CheckboxComponent';

const meta1 = {
    title: 'Example/Checkbox',
    component: CheckboxNotChecked,
} satisfies Meta<typeof CheckboxNotChecked>;

export default meta1;
type Story = StoryObj<typeof meta1>;

export const NotChecked: Story = {};
