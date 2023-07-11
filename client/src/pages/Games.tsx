// libs
import { FC, useState, useEffect, memo } from 'react';
// components
import InputAddCard from '../components/UI/InputAddCard/InputAddCard';
import BtnAddCard from '../components/UI/BtnAddCard/BtnAddCard';
import CardsRandom from '../components/UI/CardsRandom/CardsRandom';
import Checkbox from '../components/UI/Checkbox/Checkbox';
// functions
import { generateQuizWords } from '../functions/generateQuizWords';
import { validateQuiz } from '../functions/validateQuiz';
// consts
import { colours } from '../components/UI/WordCard/CardConsts';
// styles
import '../styles/Games.css';
import '../styles/theme.css';
import inputStyle from '../components/UI/Modal/ModalAddCards/FormAddCard.module.css';
import CheckboxChoice from '../components/UI//InputSearch/InputSearch.module.css';
// redux
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setInputReq } from '../store/reducers/GamesSlice';
// types
import { ICard } from '../store/reducers/authorization/Authorization/AuthTypes';
import { IGames } from '../models/models';
const Games: FC<IGames> = memo(function ({ isColorsInCards }) {
    const [testByWord, setTestByWord] = useState<boolean>(true);
    const [currentColor, setCurrentColor] = useState<string>('');
    const [testArray, setTestArray] = useState<ICard[] | []>([]);
    const searchByWordClassName = testByWord ? CheckboxChoice.underline : '';
    const searchByTranslateClassName = testByWord ? '' : CheckboxChoice.underline;

    const dispatch = useAppDispatch();
    const { cards } = useAppSelector(state => state.AuthSlice);
    const { inputReq } = useAppSelector(state => state.GamesSlice);
    const setInputWordsCount = (value: string | number) => {
        dispatch(setInputReq(Number(value)));
    };

    useEffect(() => {
        dispatch(setInputReq(0));
        setTestArray([]);
        return () => {
            dispatch(setInputReq(0));
            setTestArray([]);
        };
    }, [testByWord, currentColor, dispatch]);

    const switchColor = () => {
        if (currentColor === 'red') {
            setCurrentColor('orange');
        } else if (currentColor === 'orange') {
            setCurrentColor('green');

        } else if (currentColor === 'green') {
            setCurrentColor('');
        } else {
            setCurrentColor('red');
        }
    };
    const testByColorClassName = currentColor
        ? [colours.get(currentColor), 'colorBlock'].join(' ')
        : 'multiColorBlock colorBlock';
    const inputValue = currentColor
        ? ''
        : (inputReq ? inputReq : '');
    return (
        <div className="gameWrap pageContent">
            <div className="gameCardsField">
                <div className="title">Самопроверка</div>
                <div className="title">
                        по <span className={searchByWordClassName}>слову</span>/
                        <span className={searchByTranslateClassName}>переводу</span>:
                        <Checkbox
                            id={'wordOrTranslateSelfTest'}
                            defaultChecked={testByWord}
                            callback={() => setTestByWord(!testByWord)}
                        />
                </div>
                {
                    isColorsInCards &&
                    <div className="colorSelection" >
                        <div>По цвету:</div>
                        <button onClick={switchColor} className={testByColorClassName} />
                    </div>
                }

                <div className="gameBody">
                    {
                        cards.length ?
                            <div>
                                <form className="formTitle">
                                    <div className={'mr6 mb12'}>
                                        Введите количество слов:
                                        <InputAddCard
                                            dinamicclassname={inputStyle.inputFormAddCard + ' inputEnterWordsCount'}
                                            inputValue={inputValue}
                                            setValue={setInputWordsCount}
                                            type="number"
                                            disabled={currentColor ? true : false}
                                        />
                                    </div>
                                    <BtnAddCard
                                        onClick={
                                            e => generateQuizWords(
                                                e,
                                                inputReq,
                                                setTestArray,
                                                currentColor,
                                                cards,
                                                dispatch
                                            )
                                        }
                                        children={'Сгенерировать'}
                                    />
                                </form>
                                {
                                    testArray.length > 0 &&
                                    <form className="formCards">
                                        <CardsRandom cardsGame={testArray} testByWord={testByWord} />
                                        <div className="checkButtons">
                                            <BtnAddCard
                                                dinamicclassname={'btnGamesCheck'}
                                                onClick={
                                                    e => generateQuizWords(
                                                        e,
                                                        testArray.length,
                                                        setTestArray,
                                                        currentColor,
                                                        cards,
                                                        dispatch
                                                    )
                                                }
                                                children={'Еще попытка'}
                                            />
                                            <BtnAddCard
                                                dinamicclassname={'btnGamesCheck'}
                                                onClick={e => validateQuiz(e, testArray, testByWord, dispatch)}
                                                children={'Проверить'}
                                            />
                                        </div>
                                    </form>
                                }
                            </div>
                            : <h3 className="noWords">Добавьте слова!</h3>
                    }
                </div>
            </div>
        </div>
    );
});
export default Games;