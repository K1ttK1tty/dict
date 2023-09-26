import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/App.css';

import { AuthorizationUI } from './FormLogin';

const meta1 = {
    title: 'Example/Authorization',
    component: AuthorizationUI,
} satisfies Meta<typeof AuthorizationUI>;

export default meta1;
type Story = StoryObj<typeof meta1>;

export const Authorization: Story = {};
