import { FC } from 'react';

import '../styles/Vocabulary.css';
import '../styles/theme.css';

import image from './Icons/404Image.png';

const NotFoundPage: FC = function () {
    return (
        <div className="searchWrapper pageContent">
            <div className="CardsField">
                <div className="notFoundImageWrapper">
                    <img src={image} alt="Ошибка 404, страница не найдена" />
                </div>
            </div>
        </div>
    );
};
export default NotFoundPage;
