// libs
import { FC, useState, memo } from 'react';
// components
import InputAddCard from '../components/UI/InputAddCard/InputAddCard';
import BtnAddCard from '../components/UI/BtnAddCard/BtnAddCard';
import CardsRandom from '../components/UI/CardsRandom/CardsRandom';
import Checkbox from '../components/UI/Checkbox/Checkbox';
// functions
import { generateQuizWords } from '../functions/generateQuizWords';
import { validateQuiz } from '../functions/validateQuiz';
// hook
import { useLocaleStorage } from '../hooks/useLocaleStorage';
// consts
import { colours } from '../globalConsts/globalConsts';
// styles
import '../styles/Games.css';
import '../styles/theme.css';
import inputStyle from '../components/UI/Modal/ModalAddCards/FormAddCard.module.css';
import CheckboxChoice from '../components/UI//InputSearch/InputSearch.module.css';
// redux
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setInputReq } from '../store/reducers/GamesSlice';
// types
import { ICard } from '../store/storeModels';
import { TPrevState } from '../models/models';
const Games: FC = memo(function () {
    const [testByWord, setTestByWord] = useState<boolean>(true);
    const [testByFavorite, setTestByFavorite] = useState<boolean>(false);
    const [currentColor, setCurrentColor] = useState<string>('');
    const [testArray, setTestArray] = useState<ICard[] | []>([]);
    const searchByWordClassName = testByWord ? CheckboxChoice.underline : '';
    const searchByTranslateClassName = testByWord ? '' : CheckboxChoice.underline;
    const [isColorsInCards] = useLocaleStorage('isColorsOnCards', true);
    const dispatch = useAppDispatch();
    const { cards } = useAppSelector(state => state.AuthSlice);
    const { inputReq } = useAppSelector(state => state.GamesSlice);
    const [prevState, setPrevState] = useState<TPrevState>({ testByWord, currentColor, testByFavorite });
    const clearField = prevState.testByWord !== testByWord
        || prevState.currentColor !== currentColor
        || prevState.testByFavorite !== testByFavorite;
    if (clearField) {
        setPrevState({ testByWord, currentColor, testByFavorite });
        setTestArray([]);
    }
    const switchColor = () => {
        if (currentColor === 'red') {
            setCurrentColor('orange');
        } else if (currentColor === 'orange') {
            setCurrentColor('green');
        } else if (currentColor === 'green') {
            setCurrentColor('');
        } else setCurrentColor('red');
    };
    const testByColorClassName = currentColor
        ? [colours.get(currentColor), 'colorBlock'].join(' ')
        : 'multiColorBlock colorBlock';
    const inputValue = inputReq ? inputReq : '';
    return (
        <div className="gameWrap pageContent">
            <div className="gameCardsField">
                <div className="title">Самопроверка</div>
                {
                    cards.length &&
                    <>
                        <div className="title mb6">
                            по <span className={searchByWordClassName}>слову</span>/
                            <span className={searchByTranslateClassName}>переводу</span>:
                            <Checkbox
                                id={'wordOrTranslateSelfTest'}
                                defaultChecked={testByWord}
                                callback={() => setTestByWord(prev => !prev)}
                            />
                        </div>
                        <div className="title mb12">
                            Избранное:
                            <Checkbox
                                id={'testByFavoriteId'}
                                defaultChecked={testByFavorite}
                                callback={() => setTestByFavorite(prev => !prev)}
                            />
                        </div>
                        {
                            isColorsInCards &&
                            <div className="colorSelection" >
                                <div>По цвету:</div>
                                <button onClick={switchColor} className={testByColorClassName} />
                            </div>
                        }
                    </>
                }
                <div className="gameBody">
                    {
                        cards.length ?
                            <>
                                <form className="formTitle">
                                    <div className={'mr6 mb12'}>
                                        Введите количество слов:
                                        <InputAddCard
                                            dinamicclassname={inputStyle.inputFormAddCard + ' inputEnterWordsCount'}
                                            inputValue={inputValue}
                                            setValue={e => dispatch(setInputReq(Number(e)))}
                                            type="number"
                                        />
                                    </div>
                                    <BtnAddCard
                                        onClick={
                                            e => {
                                                e.preventDefault();
                                                generateQuizWords(
                                                    inputReq,
                                                    setTestArray,
                                                    currentColor,
                                                    testByFavorite,
                                                    cards,
                                                    dispatch
                                                );
                                            }
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
                                                onClick={e => validateQuiz(e, testArray, testByWord, dispatch)}
                                                children={'Проверить'}
                                            />
                                            <BtnAddCard
                                                dinamicclassname={'btnGamesCheck'}
                                                onClick={
                                                    e => {
                                                        e.preventDefault();
                                                        generateQuizWords(
                                                            testArray.length,
                                                            setTestArray,
                                                            currentColor,
                                                            testByFavorite,
                                                            cards,
                                                            dispatch
                                                        );
                                                    }
                                                }
                                                children={'Еще попытка'}
                                            />
                                        </div>
                                    </form>
                                }
                            </>
                            : <h3 className="noWords">Добавьте слова!</h3>
                    }
                </div>
            </div>
        </div>
    );
});
export default Games;