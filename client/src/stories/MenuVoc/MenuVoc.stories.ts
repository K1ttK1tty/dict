import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/App.css';

import { MenuVocUI } from './MenuVoc';

const meta1 = {
    title: 'Example/MenuVoc',
    component: MenuVocUI,
} satisfies Meta<typeof MenuVocUI>;

export default meta1;
type Story = StoryObj<typeof meta1>;

export const MenuVocStory: Story = {};
