import { FC } from 'react';
// components
import Checkbox from '../components/UI/Checkbox/Checkbox';
// styles
import '../styles/Vocabulary.css';
import '../styles/Games.css';
import '../styles/theme.css';
// types
import { ISettings } from '../models/models';
const Settings: FC<ISettings> = function (
    {
        isColorsInCards,
        setIsColorsInCards,
        isTwoColumns,
        setIsTwoColumns,
        showNewLabel,
        setShowNewLabel,
        order,
        setOrder
    }) {

    return (
        <div className="searchWrapper pageContent">
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

            </div>
        </div>
    );
};
export default Settings;