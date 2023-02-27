import { setInput } from "../store/upMenu"
import { setSearchWord } from "../store/upMenu"
export const _inputOn = (e, input, dispatch) => {
    if (e.target.id === 1) {
        return false
    }
    if (!input.isOpen) {
        dispatch(setInput({ isOpen: true, after: input.after }))

    } else {
        dispatch(setInput({ isOpen: false, after: input.after }))
        dispatch(setSearchWord(''))
    }
}