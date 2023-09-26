import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/App.css';
import '../../styles/theme.css';

import { ModalAddAvatarUI } from './ModalsDictionaryAndAvatar';

const meta1 = {
    title: 'Example/Modals',
    component: ModalAddAvatarUI,
} satisfies Meta<typeof ModalAddAvatarUI>;

export default meta1;
type Story = StoryObj<typeof meta1>;

export const AvatarModal: Story = {};
