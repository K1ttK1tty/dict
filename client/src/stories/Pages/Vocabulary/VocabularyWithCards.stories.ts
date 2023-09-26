import type { Meta, StoryObj } from '@storybook/react';

import '../../../styles/App.css';
import '../../../styles/Games.css';
import '../../../styles/Vocabulary.css';
import '../../../styles/theme.css';

import { VocabularyPageWithCardsUI } from './VocabularyPage';

const meta1 = {
    title: 'Example/Pages/Vocabulary',
    component: VocabularyPageWithCardsUI,
} satisfies Meta<typeof VocabularyPageWithCardsUI>;

export default meta1;
type Story = StoryObj<typeof meta1>;

export const WithCards: Story = {};
