import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/App.css';

import { SetNewPasswordUI } from './FormLogin';

const meta1 = {
    title: 'Example/Authorization',
    component: SetNewPasswordUI,
} satisfies Meta<typeof SetNewPasswordUI>;

export default meta1;
type Story = StoryObj<typeof meta1>;

export const SetNewPassword: Story = {};
