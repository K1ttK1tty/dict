import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/App.css';
import '../../styles/theme.css';

import { ModalAddCardsUI } from './Modals';

const meta1 = {
    title: 'Example/Modals',
    component: ModalAddCardsUI,
} satisfies Meta<typeof ModalAddCardsUI>;

export default meta1;
type Story = StoryObj<typeof meta1>;

export const AddCardModal: Story = {};
