import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/App.css';
import '../../styles/theme.css';

import { ModalEditCardUI } from './Modals';

const meta1 = {
    title: 'Example/Modals',
    component: ModalEditCardUI,
} satisfies Meta<typeof ModalEditCardUI>;

export default meta1;
type Story = StoryObj<typeof meta1>;

export const EditCardModal: Story = {};
