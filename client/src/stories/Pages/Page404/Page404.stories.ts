import type { Meta, StoryObj } from '@storybook/react';

import '../../../styles/Games.css';
import '../../../styles/Vocabulary.css';
import '../../../styles/theme.css';

import { Page404UI } from './Page404';

const meta1 = {
    title: 'Example/Pages/Page404',
    component: Page404UI,
} satisfies Meta<typeof Page404UI>;

export default meta1;
type Story = StoryObj<typeof meta1>;

export const Page404: Story = {};
