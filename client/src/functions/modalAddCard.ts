import { TModalAddCard } from './functoinModels';
export const modalAddCard: TModalAddCard = (modalAdd, setIsAddCardModal) => {
    setIsAddCardModal(true);
    setTimeout(() => {
        if (modalAdd.current) {

            modalAdd.current.focus();
            // console.log(modalAdd.current.getBoundingClientRect())
            // window.scrollTo()

        }
    }, 200);
};