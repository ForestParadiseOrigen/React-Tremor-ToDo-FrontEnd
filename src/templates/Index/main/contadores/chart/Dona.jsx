import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

function Dona ({contadorPendientes, contadorCompletadas}) {

    ChartJS.register(ArcElement, Tooltip, Legend);

    const data = {
        labels: ['Incompletas', 'Completadas'],
        datasets: [
            {
            label: 'Cantidad',
            data: [contadorPendientes, contadorCompletadas],
            backgroundColor: [
                '#C0C0C0', // gray
                '#a855f7' // purple
            ],
            borderColor: [
                '#999999', // stale
                '#8b5cf6' // violet
            ],
            borderWidth: 1,
            },
        ],
    };

    return <Doughnut data={data} />;
  }

export default Dona;
