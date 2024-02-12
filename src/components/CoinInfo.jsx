import { Flex, Typography } from 'antd'


const CoinInfo = ({ coin }) => {
    return (
        <Flex align='center'>
            <img
                src={coin.icon}
                alt={coin.name}
                style={{ width: 50, marginRight: 15 }}
            />
            <Typography.Title level={2} style={{ marginBottom: 0 }}>
                {coin.symbol && `(${coin.symbol}) `}
                {coin.name}
            </Typography.Title>
        </Flex>
    )
}

export default CoinInfo
