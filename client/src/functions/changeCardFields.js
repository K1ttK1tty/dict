export const changeCardFields = (cards, oldCard, newCard) => {
    const newState = JSON.parse(JSON.stringify(cards))
    newState.map(card => {
        if (card.id === oldCard.id) {
            card.word = newCard.word
            card.translate = newCard.translate
            card.theme = newCard.theme
        }
    })
    return newState

}