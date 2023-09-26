import type { Meta, StoryObj } from '@storybook/react';

import '../../../styles/Games.css';
import '../../../styles/Vocabulary.css';
import '../../../styles/theme.css';
import '../../../styles/App.css';

import { VocabularyPageWithoutUI } from './VocabularyPage';

const meta1 = {
    title: 'Example/Pages/Vocabulary',
    component: VocabularyPageWithoutUI,
} satisfies Meta<typeof VocabularyPageWithoutUI>;

export default meta1;
type Story = StoryObj<typeof meta1>;

export const WithoutCards: Story = {};
