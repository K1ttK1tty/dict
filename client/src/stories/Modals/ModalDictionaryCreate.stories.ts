import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/App.css';
import '../../styles/theme.css';

import { ModalDictionaryCreateUI } from './ModalsDictionaryAndAvatar';

const meta12 = {
    title: 'Example/Modals',
    component: ModalDictionaryCreateUI,
} satisfies Meta<typeof ModalDictionaryCreateUI>;

export default meta12;
type Story = StoryObj<typeof meta12>;

export const DictionaryModalCreate: Story = {};
