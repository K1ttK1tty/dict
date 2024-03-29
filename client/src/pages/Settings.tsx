import { FC } from 'react';

import Checkbox from '../components/UI/Checkbox/Checkbox';

import { useLocaleStorage } from '../hooks/useLocaleStorage';

import '../styles/App.css';
import '../styles/Games.css';
import '../styles/Vocabulary.css';
import '../styles/theme.css';

const Settings: FC = function () {
    const [order, setOrder] = useLocaleStorage('order', true);
    const [isTwoColumns, setIsTwoColumns] = useLocaleStorage('oneOrTwoCardsColumns', false);
    const [isColorsInCards, setIsColorsInCards] = useLocaleStorage('isColorsOnCards', true);
    const [showNewLabel, setShowNewLabel] = useLocaleStorage('showNewLabel', true);
    const [hideTranslate, setHideTranslate] = useLocaleStorage('hideTranslation', false);
    return (
        <div data-testid="settingsPage" className="searchWrapper pageContent">
            <div className="CardsField">
                <h2 className="title ">Настройки</h2>
                <div className="option">
                    <h3 className="mb12">Карточки: </h3>
                </div>

                <div className="option">
                    <div className="optionContent">
                        <Checkbox
                            defaultChecked={order}
                            id={'cardsInfoID'}
                            dinamicClassNameWrapper="mr6"
                            callback={() => setOrder(!order)}
                        />
                        Алфавитный порядок:
                    </div>
                </div>
                <div className="option">
                    <div className="optionContent">
                        <Checkbox
                            id={'oneOrTwoCardsColumnsID'}
                            dinamicClassNameWrapper="mr6"
                            defaultChecked={isTwoColumns}
                            callback={() => setIsTwoColumns(!isTwoColumns)}
                        />
                        В две колонки
                    </div>
                </div>
                <div className="option">
                    <div className="optionContent">
                        <Checkbox
                            id={'removeColorsOnCards'}
                            dinamicClassNameWrapper="mr6"
                            defaultChecked={isColorsInCards}
                            callback={() => setIsColorsInCards(!isColorsInCards)}
                        />
                        Цвета на карточках
                    </div>
                </div>
                <div className="option">
                    <div className="optionContent">
                        <Checkbox
                            id={'showNewLabel'}
                            dinamicClassNameWrapper="mr6"
                            defaultChecked={showNewLabel}
                            callback={() => setShowNewLabel(!showNewLabel)}
                        />
                        Отметка "new"
                    </div>
                </div>
                <div className="option">
                    <div className="optionContent">
                        <Checkbox
                            id={'hideTranslation'}
                            dinamicClassNameWrapper="mr6"
                            defaultChecked={hideTranslate}
                            callback={() => setHideTranslate(!hideTranslate)}
                        />
                        Скрыть перевод если выбрано "Избранное"
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Settings;
