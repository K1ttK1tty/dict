// libs
import { FC, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);
import { Pie } from 'react-chartjs-2';
// components
import SwiperComponent from '../components/UI/Swiper/SwiperComponent';
// styles
import '../styles/Vocabulary.css';
import '../styles/Games.css';
import '../styles/theme.css';
// redux
import { useAppSelector } from '../hooks/redux';
const Statistics: FC = function () {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const { data } = useAppSelector(state => state.AuthSlice);
    const numberOfCards = (dictionaryName: string) => {
        return data[dictionaryName].cards.length;
    };
    const dictionaryList = Object.keys(data);
    const options = {
        labels: dictionaryList,
        datasets: [{
            label: 'Количество карточек',
            data: dictionaryList.map(name => numberOfCards(name)),
            backgroundColor: [
                'Red',
                'orange',
                'Green'
            ],
        }]
    };
    // color: 'green' | 'red' | 'orange';
    const getColorsInDictionary = (index: number) => {
        let green = 0;
        let orange = 0;
        let red = 0;
        data[Object.keys(data)[index]].cards.map(card => {
            if (card.color === 'green') green += 1;
            if (card.color === 'orange') orange += 1;
            if (card.color === 'red') red += 1;
        });
        return [red, orange, green];
    };
    const colorLabelsArray = ['Красный','Оранжевый','Зеленый'];
    const optionsWithCertainDictionary = {
        labels: colorLabelsArray,
        datasets: [{
            label: 'Карточек по цвету',
            data: getColorsInDictionary(activeIndex),
            backgroundColor: [
                'Red',
                'orange',
                'Green'
            ],
        }]
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

                    <h2 >Карточки в словарях</h2>
                    <Pie data={optionsWithCertainDictionary} />
                </div>



            </div>
        </div>
    );
};
export default Statistics;