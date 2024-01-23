import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

function Dona ({contadorPendientes, contadorCompletadas}) {

    // bg-gradient-to-r from-purple-700 via-violet-700 to-violet-500

    ChartJS.register(ArcElement, Tooltip, Legend);

    const data = {
        labels: ['Incompletas', 'Completadas'],
        datasets: [
            {
            label: 'Cantidad',
            data: [contadorPendientes, contadorCompletadas],
            backgroundColor: [
                '#C0C0C0', // gray
                '#7c3aed' // violet
            ],
            borderColor: [
                '#999999', // stale
                '#7c3aed' // violet
            ],
            borderWidth: 1,
            },
        ],
    };

    return <Doughnut className='h-full' data={data} />;
  }

export default Dona;
