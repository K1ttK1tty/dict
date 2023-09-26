import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/App.css';
import '../../styles/theme.css';

import { ModalEditThemesUI } from './Modals';

const meta2 = {
    title: 'Example/Modals',
    component: ModalEditThemesUI,
} satisfies Meta<typeof ModalEditThemesUI>;

export default meta2;
type Story = StoryObj<typeof meta2>;

export const EditThemeModal: Story = {};
