import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/App.css';
import '../../styles/theme.css';

import { ModalDictionaryDeleteUI } from './ModalsDictionaryAndAvatar';

const meta1 = {
    title: 'Example/Modals',
    component: ModalDictionaryDeleteUI,
} satisfies Meta<typeof ModalDictionaryDeleteUI>;

export default meta1;
type Story = StoryObj<typeof meta1>;

export const DictionaryModalRemove: Story = {};
