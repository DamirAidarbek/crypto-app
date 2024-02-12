import { Layout, Typography } from 'antd'
import { useCrypto } from '../context/CryptoContext.jsx'
import PortfolioChart from '../PortfolioChart.jsx'

const contentStyle = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 65px)',
    width: '100%',
    color: '#fff',
    backgroundColor: '#001529',
    padding: '1rem'
};

const AppContent = () => {
    const { assets, crypto } = useCrypto()

    const cryptoPriceMap = crypto.reduce((acc, coin) => {
        acc[coin.id] = coin.price
        return acc
    }, {})

    return (
        <Layout.Content style={contentStyle}>
            <Typography.Title level={2} style={{ color: '#fff' }}>
                Portfolio:{' '}
                {assets
                    .map(asset => asset.amount * cryptoPriceMap[asset.id])
                    .reduce((acc, value) => acc += value, 0)
                    .toFixed(2)
                }
            </Typography.Title>
            <PortfolioChart />
        </Layout.Content>
    )
}

export default AppContent
