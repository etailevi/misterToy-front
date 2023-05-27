import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar, Line, Doughnut } from 'react-chartjs-2'
import { utilService } from '../services/util.service'
import { toyService } from '../services/toy.service'

import { useSelector } from "react-redux"
import { useEffect } from "react"

import { loadToys } from '../store/toy.action.js'

ChartJS.register(CategoryScale, LinearScale, ArcElement, PointElement, LineElement, BarElement, Title, Tooltip, Legend)

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: '',
        },
    },
}

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'December'];
const puzzle = [362, 219, 475, 303, 568, 829, 205, 428, 779, 368, 717, 532]
const baby = [538, 641, 841, 512, 342, 497, 620, 157, 139, 612, 468, 376]

export default function Dashboard() {
    const toys = useSelector((storeState) => storeState.toyModule.toys)

    useEffect(() => {
        loadToys()
    }, [])

    const toyCountByLabel = toyService.getToysPerInStock(toys)
    const pricesPerLabel = toyService.getAvgPricePerLabel(toys)
    const labelData = {
        labels: toyCountByLabel.labels,
        datasets: [
            {
                label: 'Toy labels',
                data: toyCountByLabel.percent,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    }

    const monthData = {
        labels: months,
        datasets: [
            {
                label: 'Puzzle',
                data: puzzle,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Baby',
                data: baby,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    const priceData = {
        labels: toyCountByLabel.labels,
        datasets: [
            {
                label: 'Avg. price',
                data: pricesPerLabel.priceAvg,
                backgroundColor: [
                    'rgba(255, 99, 132)',
                    'rgba(54, 162, 235)',
                    'rgba(255, 206, 86)',
                    'rgba(75, 192, 192)',
                    'rgba(153, 102, 255)',
                    'rgba(255, 159, 64)',
                    'rgba(255, 159, 190)',
                    'rgba(150, 170, 50)',
                ],
                borderColor: [
                    '#FFDEB4',
                    '#FFDEB4',
                    '#FFDEB4',
                    '#FFDEB4',
                    '#FFDEB4',
                    '#FFDEB4',
                    '#FFDEB4',
                ],
                borderWidth: 3,
            },
        ],
    };

    return (
        <section className='dash-container'>
            <h1>Dashboard</h1>
            <ul className="toy-dashboard">
                <li>
                    <h3>Percentage of toys that are in stock by labels</h3>
                    <Bar options={options} data={labelData} width={'100%'} height={'100%'} />
                </li>
                <li>
                    <h3>Comparison of sales between labels per year</h3>
                    <Line options={options} data={monthData} width={'100%'} height={'100%'} />
                </li>
                <li>
                    <h3>Prices per label</h3>
                    <Doughnut data={priceData} width={'100%'} height={'100%'}/>
                </li>
            </ul>
        </section>
    )
}