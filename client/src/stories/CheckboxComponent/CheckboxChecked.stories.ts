import type { Meta, StoryObj } from '@storybook/react';
import '../../styles/theme.css';
import '../../styles/App.css';
import '../../components/UI/Checkbox/Checkbox.module.css'
import { CheckboxChecked } from './CheckboxComponent';

const meta1 = {
    title: 'Example/Checkbox',
    component: CheckboxChecked,
} satisfies Meta<typeof CheckboxChecked>;

export default meta1;
type Story = StoryObj<typeof meta1>;

export const Checked: Story = {};
