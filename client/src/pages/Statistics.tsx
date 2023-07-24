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
import { getYearsArray, getDays, getMonths, numberOfCards, getColorsInDictionary } from './Others/StatisticsData';
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
    const [checkboxes, setCheckboxes] = useState<ICheckboxesStatistics>({
        years: false,
        months: false,
        days: true
    });
    const { data } = useAppSelector(state => state.AuthSlice);
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
    const colorLabelsArray = ['Красный', 'Оранжевый', 'Зеленый'];
    const optionsWithCertainDictionary = {
        labels: colorLabelsArray,
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
        plugins: {
            legend: { position: 'top' as const, },
            title: {
                display: true,
                text: 'Добавление карточек',
            },
        },
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
                label: 'Добавлено карточек',
                data: array.numbers,
                borderColor: 'rgb(136, 214, 47)',
                backgroundColor: 'rgb(136, 214, 47,0.5)',

            },
        ],
    };
    return (
        <div className="searchWrapper pageContent">
            <div className="CardsField">

                <h1 className="title">Статистика</h1>
                <div>
                    <h2 className="title">Карточки в словарях</h2>
                    <Pie data={options} />
                </div>
                <div>
                    <SwiperComponent
                        dinamicClassName={'swiperHorizontalLine'}
                        setActiveIndex={setActiveIndex}
                        array={dictionaryList}
                    />
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
                    <h2 >Карточки по цветам</h2>
                    <Pie data={optionsWithCertainDictionary} />
                </div>
                <div>
                    <h2>История добавления</h2>
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
                            За все время
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
                    <Line options={lineOptions} data={lineData} />
                </div>

            </div>
        </div>
    );
};
export default Statistics;