import { createSlice } from "@reduxjs/toolkit";
const Cards = createSlice({
    name: 'Cards',
    initialState: {
        cards: [
            {
                id: 1,
                word: 'to compose',
                translate: 'составить,написать',
                theme: 'verb',
            },
            {
                id: 2,
                word: 'to suspend',
                translate: 'приостановить, остановить на время или постоянно',
                theme: 'verb',
            },
            {
                id: 3,
                word: 'to extract',
                translate: 'извлекать',
                theme: 'verb',
            },
            {
                id: 4,
                word: 'to pretend',
                translate: 'притворятся, симулировать',
                theme: 'verb',
            },
            // {
            //     id: 5,
            //     word: 'to embed',
            //     translate: 'встраивать ',
            //     theme: '',
            // },

            // {
            //     id: 6,
            //     word: 'explicit',
            //     translate: 'явный, понятный',
            //     theme: '',
            // },
            // {
            //     id: 7,
            //     word: 'to eject',
            //     translate: 'выбрасывать, изгонять',
            //     theme: 'verb',
            // },
            // {
            //     id: 8,
            //     word: 'to maintain',
            //     translate: 'поддерживать, сохранять',
            //     theme: 'verb',
            // },
            // {
            //     id: 9,
            //     word: 'appropriate',
            //     translate: 'соответствующий, подходящий',
            //     theme: 'noun',
            // },
            // {
            //     id: 10,
            //     word: 'purpose',
            //     translate: 'цель, назначение, причина существования',
            //     theme: 'noun',
            // },
            // {
            //     id: 11,
            //     word: 'recent',
            //     translate: 'недавний, недавно появившийся',
            //     theme: 'noun',
            // },
            // {
            //     id: 12,
            //     word: 'confusion',
            //     translate: 'путаница, замешательство, сметение',
            //     theme: 'noun',
            // },
            // {
            //     id: 13,
            //     word: 'particular',
            //     translate: 'конкретный, особенный',
            //     theme: 'noun',
            // },
            // {
            //     id: 14,
            //     word: 'to research',
            //     translate: 'изучение, исследование',
            //     theme: 'verb',
            // },
            // {
            //     id: 15,
            //     word: 'insight',
            //     translate: 'понимание решения проблемы, новая идея для...',
            //     theme: '',
            // },
            // {
            //     id: 16,
            //     word: 'to share',
            //     translate: 'делиться',
            //     theme: 'verb',
            // },
            // {
            //     id: 17,
            //     word: 'Value',
            //     translate: 'Значение',
            //     theme: 'noun',
            // },
            // {
            //     id: 18,
            //     word: 'to gather',
            //     translate: 'Собирать, коллекционировать',
            //     theme: 'verb',
            // },
            // {
            //     id: 19,
            //     word: 'to mount',
            //     translate: 'Монтировать, устанавливать',
            //     theme: 'verb',
            // },
            // {
            //     id: 20,
            //     word: 'to confess',
            //     translate: 'Признаваться, сознаваться',
            //     theme: 'verb',
            // },
            // {
            //     id: 21,
            //     word: 'to outclass',
            //     translate: 'Превосходить',
            //     theme: 'verb',
            // },
            // {
            //     id: 22,
            //     word: 'to handle',
            //     translate: 'обрабатывать',
            //     theme: 'verb',
            // },
            // {
            //     id: 23,
            //     word: 'shared',
            //     translate: 'общий',
            //     theme: 'noun',
            // },
        ],
        changeCard: {
            word: '',
            translate: '',
            theme: ''
        }
    },
    reducers: {
        setCards(state, action) {
            state.cards = action.payload
        },
        setID(state) {
            state.cards.map((card, index) => {
                card.id = index + 1
            })
        },
        changeCardFields(state, action) {
            const oldCard = action.payload.old;
            const newFields = action.payload.new
            state.cards.map(card => {
                if (card.id === oldCard.id) {
                    card.word = newFields.word
                    card.translate = newFields.translate
                }
            })
        },
        setChangeCard(state, action) {
            state.changeCard = action.payload
        }
    }
})
export default Cards.reducer
export const { setCards, setID, changeCardFields, setChangeCard } = Cards.actions