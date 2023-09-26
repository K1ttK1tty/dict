import type { Meta, StoryObj } from '@storybook/react';

import '../../../styles/Games.css';
import '../../../styles/Vocabulary.css';
import '../../../styles/theme.css';

import { SettingsUI } from './Settings';

const meta1 = {
    title: 'Example/Pages/Settings',
    component: SettingsUI,
} satisfies Meta<typeof SettingsUI>;

export default meta1;
type Story = StoryObj<typeof meta1>;

export const Colors: Story = {};
