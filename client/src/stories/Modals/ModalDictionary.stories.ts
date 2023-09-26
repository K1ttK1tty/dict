import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/App.css';
import '../../styles/theme.css';

import { ModalDictionaryUI } from './Modals';

const meta1 = {
    title: 'Example/Modals',
    component: ModalDictionaryUI,
} satisfies Meta<typeof ModalDictionaryUI>;

export default meta1;
type Story = StoryObj<typeof meta1>;

export const DictionaryModal: Story = {};
