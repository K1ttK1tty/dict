import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/App.css';

import { LoginUI } from './FormLogin';

const meta1 = {
    title: 'Example/Authorization',
    component: LoginUI,
} satisfies Meta<typeof LoginUI>;

export default meta1;
type Story = StoryObj<typeof meta1>;

export const LoginForm: Story = {};
