import type { Meta, StoryObj } from '@storybook/react';

import DefaultStyles from '../../components/UI/BtnAddCard/BtnAddCard.module.css';
import btnStyle from '../../components/UI/Modal/ModalAddCards/FormAddCard.module.css';
import ModalDictionary from '../../components/UI/Modal/ModalDictionary/ModalDictionary.module.css';
import ModalEditCard from '../../components/UI/Modal/ModalEditCard/Modal.module.css';
import ModalEditThemes from '../../components/UI/Modal/ModalEditThemes/ModalEditThemes.module.css';
import UserMenuStyles from '../../components/UI/UserMenu/UserMenu.module.css';

import { buttonAddCard } from './Button';

const meta1 = {
    title: 'Example/Button',
    component: buttonAddCard,
} satisfies Meta<typeof buttonAddCard>;

export default meta1;
type Story = StoryObj<typeof meta1>;

export const Default: Story = { args: { children: 'Сгенерировать' } };
export const AddCardButton: Story = {
    args: {
        dinamicclassname: [btnStyle.btnCreateCard, DefaultStyles.btnAddCard].join(' '),
        children: 'Создать карточку',
    },
};
export const ModalEditThemesCard: Story = {
    args: {
        dinamicclassname: [ModalEditCard.btnFormEditCard, ModalEditThemes.button, DefaultStyles.btnAddCard].join(' '),
        children: 'Изменить',
    },
};
export const DropDownButton: Story = {
    args: {
        dinamicclassname: [UserMenuStyles.btnExit, DefaultStyles.btnAddCard].join(' '),
        children: 'Выйти из аккаунта',
    },
};
export const ModalDictionaryChange: Story = {
    args: {
        dinamicclassname: [ModalDictionary.button, DefaultStyles.btnAddCard].join(' '),
        children: 'Сменить',
    },
};
export const ModalDictionaryDelete: Story = {
    args: {
        dinamicclassname: [ModalDictionary.button, ModalDictionary.removeButton, DefaultStyles.btnAddCard].join(' '),
        children: 'Удалить',
    },
};
