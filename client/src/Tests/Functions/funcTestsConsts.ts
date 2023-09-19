import { ICard } from '../../store/storeModels';

export const mokedCards: ICard[] = [
    {
        id: 0,
        word: 'word',
        translate: 'translate',
        theme: 'theme',
        note: 'note',
        color: 'red',
        time: 123123,
        favorite: false,
    },
    {
        id: 1,
        word: 'word1',
        translate: 'translate1',
        theme: 'theme1',
        note: 'note1',
        color: 'orange',
        time: 123123,
        favorite: false,
    },
];
export const cardsWithNewTheme: ICard[] = [
    {
        id: 0,
        word: 'word',
        translate: 'translate',
        theme: 'changeTheme',
        note: 'note',
        color: 'red',
        time: 123123,
        favorite: false,
    },
    {
        id: 1,
        word: 'word1',
        translate: 'translate1',
        theme: 'theme1',
        note: 'note1',
        color: 'orange',
        time: 123123,
        favorite: false,
    },
];
export const mokedOldCard: ICard = {
    id: 0,
    word: 'Oldword',
    translate: 'Oldtranslate',
    theme: 'Oldtheme',
    note: 'Oldnote',
    color: 'orange',
    time: 123123,
    favorite: false,
};
export const mokedNewCard: ICard = {
    id: 4,
    word: 'Newword',
    translate: 'Newtranslate',
    theme: 'Newtheme',
    note: 'Newnote',
    color: 'green',
    time: 123123,
    favorite: false,
};
export const withoutIdCard: ICard = {
    id: 123112323,
    word: 'Newword',
    translate: 'Newtranslate',
    theme: 'Newtheme',
    note: 'Newnote',
    color: 'green',
    time: 123123,
    favorite: false,
};
export const mokedReturnedCards: ICard[] = [
    {
        id: 0,
        word: 'Newword',
        translate: 'Newtranslate',
        theme: 'Newtheme',
        note: 'Newnote',
        color: 'red',
        time: 123123,
        favorite: false,
    },
    {
        id: 1,
        word: 'word1',
        translate: 'translate1',
        theme: 'theme1',
        note: 'note1',
        color: 'orange',
        time: 123123,
        favorite: false,
    },
];

// themes
export const mockThemes = ['theme1', 'theme2'];
export const newThemes = ['abobo', 'theme2'];

