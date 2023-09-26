import type { Meta, StoryObj } from '@storybook/react';
import { AlertForTest } from './Alert';
const meta1 = {
    title: 'Example/Alert',
    component: AlertForTest,
} satisfies Meta<typeof AlertForTest>;

export default meta1;
type Story = StoryObj<typeof meta1>;

export const WithText: Story = {};