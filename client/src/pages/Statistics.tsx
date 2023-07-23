import { FC } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);
import { Pie } from 'react-chartjs-2';

// styles
import '../styles/Vocabulary.css';
import '../styles/Games.css';
import '../styles/theme.css';
const Statistics: FC = function () {

    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'Red',
                'Blue',
                'Yellow',
                'Green',
                'Purple',
                'Orange',
            ],
        }]
    };


    return (
        <div className="searchWrapper pageContent">
            <div className="CardsField">

                <h2 className="title">Статистика</h2>

                <Pie data={data} />

            </div>
        </div>
    );
};
export default Statistics;