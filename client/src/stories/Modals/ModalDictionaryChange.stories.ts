import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/App.css';
import '../../styles/theme.css';

import { ModalDictionaryChangeUI } from './ModalsDictionaryAndAvatar';

const meta1 = {
    title: 'Example/Modals',
    component: ModalDictionaryChangeUI,
} satisfies Meta<typeof ModalDictionaryChangeUI>;

export default meta1;
type Story = StoryObj<typeof meta1>;

export const DictionaryModalChange: Story = {};
