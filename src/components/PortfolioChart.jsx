import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useCrypto } from './context/CryptoContext.jsx'

ChartJS.register(ArcElement, Tooltip, Legend);

function PortfolioChart() {
    const { assets } = useCrypto()

    const data = {
        labels: assets.map(asset => asset.id),
        datasets: [
            {
                label: '$',
                data: assets.map(asset => asset.totalAmount),
                backgroundColor: [
                    'rgba(255, 99, 132)',
                    'rgba(54, 162, 235)',
                    'rgba(255, 206, 86)',
                    'rgba(75, 192, 192)',
                    'rgba(153, 102, 255)',
                    'rgba(255, 159, 64)',
                ],
                borderColor: [
                    'rgba(255, 99, 132)',
                    'rgba(54, 162, 235)',
                    'rgba(255, 206, 86)',
                    'rgba(75, 192, 192)',
                    'rgba(153, 102, 255)',
                    'rgba(255, 159, 64)',
                ],
                borderWidth: 1,
            },
        ],
    };
    return (
        <div style={{
            display: 'flex',
            marginBottom: '1rem',
            justifyContent: 'center',
            height: 400,
        }}>
            <Pie
                data={data}
            />
        </div>
    )
}

export default PortfolioChart
