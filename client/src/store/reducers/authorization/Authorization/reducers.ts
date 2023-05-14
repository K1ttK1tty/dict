export const reducers = {
    /////////////// DELETE THIS !
    setIsAuth(state) {
        state.isAuth = true
    },
    //////////////


    // cards
    setCards(state, action) {
        state.cards = action.payload
    },
    setID(state) {
        state.cards.map((card, index) => {
            card.id = index + 1
        })
    },
    setChangeCard(state, action) {
        state.changeCard = action.payload
    },
    setToggleWordsOrder(state) {
        state.toggleWordsOrder = !state.toggleWordsOrder
    },
    // select
    setOptionName(state, action) {
        state.optionName = action.payload
    },
    setOptionState(state, action) {
        state.optionState = action.payload
    },
    setSelectOptions(state, action) {
        state.selectOptions = action.payload
    },
    setChooseTheme(state, action) {
        state.chooseTheme = action.payload
    },
    // avatar
    setAvatar(state, action) {
        state.avatar = action.payload
    },
    // servers response
    setServerMessage(state) {
        state.serverMessage = '';
    },
    setStatus(state) {
        state.status = 200;
    }


}