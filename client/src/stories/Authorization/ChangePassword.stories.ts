import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/App.css';

import { ChangePasswordUI } from './FormLogin';

const meta1 = {
    title: 'Example/Authorization',
    component: ChangePasswordUI,
} satisfies Meta<typeof ChangePasswordUI>;

export default meta1;
type Story = StoryObj<typeof meta1>;

export const ChangePassword: Story = {};
