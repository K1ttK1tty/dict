import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/App.css';

import { RegistrationUI } from './FormLogin';

const meta1 = {
    title: 'Example/Authorization',
    component: RegistrationUI,
} satisfies Meta<typeof RegistrationUI>;

export default meta1;
type Story = StoryObj<typeof meta1>;

export const RegistrationForm: Story = {};
