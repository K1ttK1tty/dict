import { FC } from 'react';

import { useAppSelector } from '../../../../hooks/redux';

const SoundIcon: FC = function () {
    const { editCard } = useAppSelector(state => state.modalRenameCard);
    const listen = () => {
        const t = new SpeechSynthesisUtterance(editCard.word);
        t.lang = 'ru';
        speechSynthesis.speak(t);
    };
    return (
        <svg style={{ cursor: 'pointer' }} onClick={listen} width="40px" height="40px" viewBox="0 0 24 24" fill="none">
            <path
                d="M12 7V17M9   10V13M15 4V20M18 9V15M21 11V13"
                stroke="#001A72"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
export default SoundIcon;
