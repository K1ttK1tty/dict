// libs
import { FC, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Filler,
} from 'chart.js';
ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);
import { Pie, Line } from 'react-chartjs-2';
// components
import SwiperComponent from '../components/UI/Swiper/SwiperComponent';
import Checkbox from '../components/UI/Checkbox/Checkbox';
// functions 
import {
    getYearsArray,
    getDays,
    getMonths,
    numberOfCards,
    getColorsInDictionary,
    getAllCards
} from './Others/StatisticsData';
// hook
import { useLocaleStorage } from '../hooks/useLocaleStorage';
// styles
import '../styles/Vocabulary.css';
import '../styles/Games.css';
import '../styles/theme.css';
// redux
import { useAppSelector } from '../hooks/redux';
// types
import { ICheckboxesStatistics, IArrayWithStats } from '../models/models';
const Statistics: FC = function () {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [allDictionaries, setAllDictionaries] = useState<boolean>(false);
    const [isColorsInCards] = useLocaleStorage('isColorsOnCards', true);
    const [checkboxes, setCheckboxes] = useState<ICheckboxesStatistics>({
        years: false,
        months: false,
        days: true
    });
    const { data, user } = useAppSelector(state => state.AuthSlice);
    const dictionaryList = Object.keys(data);
    const options = {
        labels: dictionaryList,
        datasets: [{
            label: 'Количество карточек',
            data: dictionaryList.map(name => numberOfCards(name, data)),
            backgroundColor: [
                'Red',
                'orange',
                'Green'
            ],
        }]
    };
    const optionsWithCertainDictionary = {
        type: 'line',
        labels: ['Красный', 'Оранжевый', 'Зеленый'],
        datasets: [{
            label: 'Карточек по цвету',
            data: getColorsInDictionary(activeIndex, data, allDictionaries),
            backgroundColor: [
                'Red',
                'orange',
                'Green'
            ],
        }]
    };

    const lineOptions = {
        responsive: true,
        scales: {
            x: {
                grid: {
                    color: 'rgba(128, 128, 128, 0.7)',
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(128, 128, 128, 0.7)',
                }
            }
        }
    };
    let array: IArrayWithStats = getMonths(activeIndex, data);
    if (checkboxes.years) array = getYearsArray(activeIndex, data, allDictionaries);
    else if (checkboxes.days) array = getDays(activeIndex, data, allDictionaries);
    else if (checkboxes.months) array = getMonths(activeIndex, data, allDictionaries);
    const lineData = {
        labels: array.keys,
        datasets: [
            {
                fill: true,
                label: '',
                data: array.numbers,
                borderColor: 'rgb(136, 214, 47)',
                backgroundColor: 'rgb(136, 214, 47,0.6)',
            },
        ],
    };
    return (
        <div className="searchWrapper pageContent">
            <div className="CardsField">
                <h1 className="title">Статистика</h1>

                {
                    getAllCards(data).length > 0
                        ?
                        <>
                            <div className="statistics">
                                <h2 className="title mb12 fz18">Дате регистрации: {user.registrationDate}</h2>
                                <h3 className="title">Карточки в словарях</h3>
                                <div className="diagrams">

                                    <div>
                                        <h3 className="tac">Карточки в словарях</h3>
                                        <Pie data={options} className="diagram" />
                                    </div>

                                    {
                                        isColorsInCards &&
                                        <div>
                                            <h3 className="tac">Цвета в выбранном словаре</h3>
                                            <Pie data={optionsWithCertainDictionary} className="diagram" />
                                        </div>
                                    }
                                </div>
                                <div className="option">
                                    <div className="optionContent">

                                        <Checkbox
                                            checked={allDictionaries}
                                            id={'statisticsAllCards'}
                                            dinamicClassNameWrapper="mr6"
                                            callback={() => setAllDictionaries(prev => !prev)}
                                        />
                                        Все словари
                                    </div>
                                </div>
                                <SwiperComponent
                                    dinamicClassName={'swiperHorizontalLine'}
                                    setActiveIndex={setActiveIndex}
                                    array={dictionaryList}
                                />
                                <h3 className="tac">История добавления</h3>

                                <div className="option">
                                    <div className="optionContent">
                                        <Checkbox
                                            checked={checkboxes.years}
                                            id={'statisticsYears'}
                                            dinamicClassNameWrapper="mr6"
                                            callback={() => setCheckboxes({
                                                years: true,
                                                months: false,
                                                days: false
                                            })}
                                        />
                                        За каждый год
                                    </div>
                                </div>
                                <div className="option">
                                    <div className="optionContent">

                                        <Checkbox
                                            checked={checkboxes.months}
                                            id={'statisticsMonths'}
                                            dinamicClassNameWrapper="mr6"
                                            callback={() => setCheckboxes({
                                                years: false,
                                                months: true,
                                                days: false
                                            })}
                                        />
                                        За текущий год
                                    </div>
                                </div>
                                <div className="option">
                                    <div className="optionContent">
                                        <Checkbox
                                            checked={checkboxes.days}
                                            id={'statisticsDays'}
                                            dinamicClassNameWrapper="mr6"
                                            callback={() => setCheckboxes({
                                                years: false,
                                                months: false,
                                                days: true
                                            })}
                                        />
                                        За текущий месяц
                                    </div>
                                </div>
                            </div>

                            <div className="chart" >
                                <p className="count">Слов: {array.count}</p>
                                <Line options={lineOptions} data={lineData} />
                            </div>
                        </>

                        :
                        <div className="poem">
                            <p>Словами наполни</p>
                            <p>И страница покажет</p>
                            <p>Твою статистику...</p>
                            <p className="author">Автор.</p>

                        </div>
                }
            </div>
        </div>
    );
};
export default Statistics;